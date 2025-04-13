// Handle POST data received from a client
async function httpPostReceiver(request) {
    try {
        const data = await request.text();
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        } catch {
            parsedData = data;
        }
        console.log('Received data:', parsedData);
        const responseData = {
            status: 'success',
            received: parsedData,
            timestamp: new Date().toISOString()
        };
        return new Response(JSON.stringify(responseData), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

self.addEventListener('fetch', event => {
    if (event.request.method === 'POST') {
        event.respondWith(httpPostReceiver(event.request));
    }
});