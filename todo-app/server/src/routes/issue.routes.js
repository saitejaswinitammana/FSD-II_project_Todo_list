const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');

router.get('/', issueController.getIssues);
router.post('/', issueController.createIssue);
router.get('/:id', issueController.getIssueById);
router.patch('/:id', issueController.updateIssue);
router.delete('/:id', issueController.deleteIssue);

module.exports = router;
