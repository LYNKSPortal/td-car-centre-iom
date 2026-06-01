import dotenv from 'dotenv';
import { db } from '../lib/db';
import { users } from '../lib/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from 'bcryptjs';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function updateAdminPassword() {
  try {
    // Generate a strong password
    const newPassword = 'TDCar2026!Secure#Admin';
    
    console.log('🔐 Updating admin password...\n');
    console.log('New password:', newPassword);
    console.log('\n⚠️  IMPORTANT: Save this password securely!\n');

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update the admin user
    const result = await db
      .update(users)
      .set({ passwordHash: hashedPassword })
      .where(eq(users.email, 'admin@tdcarcentre.co.uk'))
      .returning();

    if (result.length > 0) {
      console.log('✅ Password updated successfully!');
      console.log('\nLogin credentials:');
      console.log('Email: admin@tdcarcentre.co.uk');
      console.log('Password:', newPassword);
      console.log('\n📝 Please save these credentials in a secure location.');
    } else {
      console.log('❌ Admin user not found');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

updateAdminPassword();
