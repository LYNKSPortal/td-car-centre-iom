export const dynamic = 'force-dynamic';

export default async function EditVehiclePage(props: any) {
  console.log('=== EditVehiclePage Debug ===');
  console.log('props:', JSON.stringify(props, null, 2));
  console.log('typeof props:', typeof props);
  console.log('props.params:', props?.params);
  
  let params;
  try {
    // Try awaiting if it's a promise
    if (props?.params && typeof props.params.then === 'function') {
      console.log('params is a Promise, awaiting...');
      params = await props.params;
    } else {
      console.log('params is NOT a Promise, using directly');
      params = props?.params;
    }
  } catch (error) {
    console.error('Error accessing params:', error);
  }
  
  console.log('Final params:', params);
  console.log('params.id:', params?.id);
  console.log('=== End Debug ===');
  
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Vehicle - Debug Mode</h1>
      <div className="space-y-2 bg-zinc-900 p-4 rounded">
        <p><strong>Props type:</strong> {typeof props}</p>
        <p><strong>Props:</strong> {JSON.stringify(props)}</p>
        <p><strong>Params:</strong> {JSON.stringify(params)}</p>
        <p><strong>ID:</strong> {params?.id || 'UNDEFINED'}</p>
      </div>
    </div>
  );
}
