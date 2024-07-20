import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', async (req: Request, res: Response) => {
    try {
        const update = req.body;
        console.log('Received webhook:', update);

        if (update && update.message && update.message.from) {
            const { id, first_name, username } = update.message.from;
            console.log('User ID:', id);
            console.log('First Name:', first_name);
            console.log('Username:', username);
        }

        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
