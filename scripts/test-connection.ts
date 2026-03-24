import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('Connection string format check:');
  console.log('- Starts with postgresql://', dbUrl.startsWith('postgresql://') ? '✅' : '❌');
  console.log('- Contains @', dbUrl.includes('@') ? '✅' : '❌');
  console.log('- Contains neon.tech', dbUrl.includes('neon.tech') ? '✅' : '❌');
  console.log('- Contains sslmode=require', dbUrl.includes('sslmode=require') ? '✅' : '❌');
  
  console.log('\n🔄 Attempting connection...');
  
  try {
    const sql = postgres(dbUrl, { max: 1 });
    const result = await sql`SELECT version()`;
    console.log('✅ Connection successful!');
    console.log('📊 PostgreSQL version:', result[0].version.split(' ')[1]);
    await sql.end();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Possible solutions:');
    console.error('1. Copy the connection string again from Neon dashboard');
    console.error('2. Click "Copy snippet" button in Neon (not just the visible text)');
    console.error('3. Make sure you copied the POOLED connection string');
    console.error('4. Verify no extra spaces or line breaks in .env.local');
    process.exit(1);
  }
}

testConnection();
