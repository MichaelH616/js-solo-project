const RunDataController = require('../controllers/runData.controller');
// const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/runs', RunDataController.allRuns);
    app.get('/api/runs/:id', RunDataController.findOneRun);
    app.post('/api/runs', RunDataController.createRun);
    app.put('/api/runs/:id', RunDataController.updateRun);
    app.delete('/api/runs/:id', RunDataController.deleteRun);
}