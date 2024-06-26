//sagiButa
//ai router for insight api

const express = require('express');
const router = express.Router();
const { createInsight, getOneInsight, getAllInsights, updateInsight, deleteInsight } = require('../BL/services/insight.service');

// Get all insights by any filter
router.get('/', async (req, res) => {
    try {
        let filter = {}
        const select = req.query.select || null;// ? optional select to return
        if (req.query.filter) {
            const filterVlue = req.query.filter, // any filter no unique
                key = req.query.key
            // filter = { [key]: filterVlue }
            filter[key] = filterVlue
        }
        const insights = await getAllInsights(filter, select);
        res.status(200).json(insights);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get one insight by _id or any filter
router.get('/onebyid', async (req, res) => {
    try {
        const filterId = req.query.id;// id
        if (!filterId) {
            res.status(400).send('Filter parameter id is required');
            return false;
        }
        // if (!filter) { return res.status(400).send('Filter parameter id is required'); }
        const select = req.query.select || null; // ? optional select to return
        const insight = await getOneInsight(filterId, select);
        if (!insight) {
            return res.status(404).send('Insight not found');
        }
        res.status(200).json(insight);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

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
