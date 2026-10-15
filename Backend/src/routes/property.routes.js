import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @route   POST /api/properties
 * @desc    Submit a new 9-step stay listing (Requires host login)
 * @access  Private
 */
router.post('/', authenticate, PropertyController.createProperty);

/**
 * @route   GET /api/properties/my-listings
 * @desc    Get all properties created by the authenticated host
 * @access  Private
 */
router.get('/my-listings', authenticate, PropertyController.getMyListings);

/**
 * @route   GET /api/properties
 * @desc    Public listing discovery: returns ONLY approved listings
 * @access  Public
 */
router.get('/', PropertyController.getPublicListings);

/**
 * @route   GET /api/properties/admin/all
 * @desc    Admin moderation queue: view all submissions across statuses
 * @access  Private (Admin / Super Admin)
 */
router.get('/admin/all', authenticate, PropertyController.getAdminListings);

/**
 * @route   PATCH /api/properties/:id/approval
 * @desc    Super Admin approves or rejects a property listing
 * @access  Private (Admin / Super Admin)
 */
router.patch('/:id/approval', authenticate, PropertyController.updateApprovalStatus);

/**
 * @route   POST /api/properties/draft
 * @desc    Auto-save or update active listing draft (Cross-device sync)
 * @access  Private
 */
router.post('/draft', authenticate, PropertyController.saveDraft);

/**
 * @route   GET /api/properties/draft
 * @desc    Fetch active listing draft for authenticated host
 * @access  Private
 */
router.get('/draft', authenticate, PropertyController.getDraft);

/**
 * @route   DELETE /api/properties/draft
 * @desc    Discard / delete active listing draft
 * @access  Private
 */
router.delete('/draft', authenticate, PropertyController.deleteDraft);

/**
 * @route   GET /api/properties/:id
 * @desc    Get full property details by ID (public if approved, host/admin if waiting)
 * @access  Public / Private
 */
router.get('/:id', PropertyController.getPropertyById);

export default router;
