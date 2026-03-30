import express from 'express';

const healthRouter = express.Router();

healthRouter.get('/health', (req, res) => {
    console.log("Health route hit");
    const now = new Date();
    res.status(200).json({
        status: 'OK',
        message: 'Server is awake',
        timestamp: now.toISOString()
    });
});

export default healthRouter;
