import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
// app.use('/*', cors({ origin: 'sendangbandung.com' }))
// app.use(
// 	'*',
// 	cors({
// 		origin: 'sendangbandung.com',
// 		allowHeaders: ['Content-Type', 'Authorization'],
// 		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// 		credentials: true,
// 	})
// );

app.get('/', (c) => {
	return c.json({
		message: 'Hello, Hono with Vite SSR!'
	})
})

app.post('/chat', async (c) => {
	let account = c.env.ACCOUNT_ID;
	let token = c.env.TOKEN;

	let body = await c.req.json();
	let ans = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/autorag/rags/tsb_cb/ai-search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			query: body.query,
		})
	});
	let data = await ans.json();

	return c.json(data);
})

export default app
