const router = new Router();
const reviewContoller = require('../controllers/reviewController');

router.post('/review/create', reviewContoller.createReview);
router.get('', reviewContoller.getAllReviews);
router.post('/create', reviewContoller.createReview);

module.exports = router;