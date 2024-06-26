const express = require('express');
const router = express.Router();
const { createInsight, getInsight, getAll, updateInsight, deleteInsight } = require('../BL/services/insight.service');

// router.get('/', async (req, res) => {
//     try {
//         const Insight = await getAll();
//         res.send(Insight);
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// });
// router.delete('/:Insight', async (req, res) => {
//     try {
//         const Insight = await deleteInsight(req.params.id);
//         if (!Insight) {
//             return res.status(404).send('Insight not found');
//         }
//         res.status(200).send('Insight deleted');
//     } catch (err) {
//         res.send(err.message);
//     }
// });



// Get all insights by any filter
router.get('/', async (req, res) => {
    try {
        const filter = req.query;
        const select = req.query.select || null;
        const insights = await getAll(filter, select);
        res.status(200).json(insights);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get one insight by _id or any filter
router.get('/:oneinsight', async (req, res) => {
    try {
        const filter = req.params.filter
        const insight = await getInsight(filter);
        if (!insight) {
            return res.status(404).send('Insight not found');
        }
        res.status(200).json(insight);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Create a new insight
router.post('/', async (req, res) => {
    try {
        const data = await createInsight(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update an insight
router.put('/:id', async (req, res) => {
    try {
        const data = await updateInsight(req.params.id, req.body);
        if (!data) {
            return res.status(404).send('Insight not found');
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete an insight
router.delete('/:id', async (req, res) => {
    try {
        const data = await deleteInsight(req.params.id);
        if (!data) {
            return res.status(404).send('Insight not found');
        }
        res.status(200).send('Insight deleted');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;




module.exports = router;