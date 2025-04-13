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
            timestamp: new Date().toISOString(),
            message: "Processed by custom route handler"
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
    const url = new URL(event.request.url);
    if (event.request.method === 'POST' && url.pathname === '/moon') {
        event.respondWith(httpPostReceiver(event.request));
    }
})