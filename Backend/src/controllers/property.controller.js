import { PropertyModel } from '../models/property.model.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Property Controller
 * Handles host stay submissions across all 9 steps, approval lifecycle, and public discovery.
 */
export class PropertyController {
  /**
   * Submit a new property listing (Step 1 to Step 9).
   * Automatically sets status to 'waiting_for_approval' and links to authenticated host.
   */
  static async createProperty(req, res, next) {
    try {
      const hostId = req.user.user_id;
      const {
        propertyName,
        propertyType,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        latitude,
        longitude,
        roomTypes,
        roomConfigs,
        totalRooms,
        roomPrices,
        occupancyAdjustments,
        childPricing,
        instantPayment,
        freeCancellation,
        refundPolicies,
        roomCapacities,
        checkInTime,
        checkOutTime,
        minAge,
        acceptedIds,
        unmarriedCouplesAllowed,
        maleOnlyGroupsAllowed,
        scantyBaggageAllowed,
        smokingAllowed,
        alcoholAllowed,
        nonVegAllowed,
        outsideFoodAllowed,
        foodDeliveryOptions,
        wheelchairAccessible,
        wheelchairProvided,
        petsAllowed,
        petsOnProperty,
        extraMattressChild,
        extraMattressAdult,
        extraCotCost,
        additionalRules,
        amenities,
        photos,
        coverPhoto,
        aboutPropertyText,
        distanceBeach,
        distanceRailway,
        distanceAirport,
        distanceBus,
        allowedGuestTypes,
        instantBooking,
        manualApproval,
        gstin,
        licenseNumber,
        businessName,
        panNumber,
        tradeLicense,
        fireSafetyNumber,
        ownerName,
        ownerAadhar,
        ownerPhoto,
        ownershipProof,
        bankAccountName,
        bankAccountNumber,
        ifscCode,
        cancelledCheque,
        isLegalDeclared
      } = req.body;

      // Validation
      if (!propertyName || !propertyName.trim()) {
        return sendError(res, 'Property name is required.', [], 400);
      }
      if (!addressLine1 || !addressLine1.trim()) {
        return sendError(res, 'Address Line 1 is required.', [], 400);
      }
      if (!city || !city.trim()) {
        return sendError(res, 'City is required.', [], 400);
      }
      if (!state || !state.trim()) {
        return sendError(res, 'State / Province is required.', [], 400);
      }
      if (!zipCode || !zipCode.trim()) {
        return sendError(res, 'Zip / Postal Code is required.', [], 400);
      }

      // Automatically determine cover photo if not explicitly chosen
      let resolvedCoverPhoto = coverPhoto;
      if (!resolvedCoverPhoto && Array.isArray(photos) && photos.length > 0) {
        resolvedCoverPhoto = typeof photos[0] === 'string' ? photos[0] : (photos[0]?.url || photos[0]?.dataUrl);
      }

      const property = await PropertyModel.create({
        hostId,
        propertyName: propertyName.trim(),
        propertyType: propertyType || 'Hotel',
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2?.trim() || null,
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        latitude: parseFloat(latitude) || 11.941600,
        longitude: parseFloat(longitude) || 79.808300,
        roomTypes: roomTypes || ['Single'],
        roomConfigs: roomConfigs || {},
        totalRooms: parseInt(totalRooms, 10) || 1,
        roomPrices: roomPrices || {},
        occupancyAdjustments: occupancyAdjustments || [],
        childPricing: childPricing || [],
        instantPayment: instantPayment !== false,
        freeCancellation: freeCancellation !== false,
        refundPolicies: refundPolicies || [],
        roomCapacities: roomCapacities || {},
        checkInTime: checkInTime || '14:00',
        checkOutTime: checkOutTime || '11:00',
        minAge: parseInt(minAge, 10) || 18,
        acceptedIds: acceptedIds || ['Aadhar', 'Govt ID'],
        unmarriedCouplesAllowed: unmarriedCouplesAllowed || 'No',
        maleOnlyGroupsAllowed: maleOnlyGroupsAllowed || 'No',
        scantyBaggageAllowed: scantyBaggageAllowed || 'No',
        smokingAllowed: smokingAllowed || 'No',
        alcoholAllowed: alcoholAllowed || 'No',
        nonVegAllowed: nonVegAllowed || 'No',
        outsideFoodAllowed: outsideFoodAllowed || 'No',
        foodDeliveryOptions: foodDeliveryOptions || [],
        wheelchairAccessible: wheelchairAccessible || 'No',
        wheelchairProvided: wheelchairProvided || 'No',
        petsAllowed: petsAllowed || 'No',
        petsOnProperty: petsOnProperty || 'No',
        extraMattressChild: parseFloat(extraMattressChild) || 0,
        extraMattressAdult: parseFloat(extraMattressAdult) || 0,
        extraCotCost: parseFloat(extraCotCost) || 0,
        additionalRules: additionalRules || null,
        amenities: amenities || [],
        photos: photos || [],
        coverPhoto: resolvedCoverPhoto,
        aboutPropertyText: aboutPropertyText || null,
        distanceBeach: parseFloat(distanceBeach) || 0,
        distanceRailway: parseFloat(distanceRailway) || 0,
        distanceAirport: parseFloat(distanceAirport) || 0,
        distanceBus: parseFloat(distanceBus) || 0,
        allowedGuestTypes: allowedGuestTypes || ['Married Couples', 'Families', 'Solo Travelers'],
        instantBooking: instantBooking || 'No',
        manualApproval: manualApproval || 'Yes',
        gstin: gstin || null,
        licenseNumber: licenseNumber || null,
        businessName: businessName || null,
        panNumber: panNumber || null,
        tradeLicense: tradeLicense || null,
        fireSafetyNumber: fireSafetyNumber || null,
        ownerName: ownerName || req.user.full_name,
        ownerAadhar: ownerAadhar || null,
        ownerPhoto: ownerPhoto || null,
        ownershipProof: ownershipProof || null,
        bankAccountName: bankAccountName || null,
        bankAccountNumber: bankAccountNumber || null,
        ifscCode: ifscCode || null,
        cancelledCheque: cancelledCheque || null,
        isLegalDeclared: isLegalDeclared !== false
      });

      // Clear any in-progress draft since property is now finalized & submitted
      try {
        await PropertyModel.deleteDraft(hostId);
      } catch (e) {
        // ignore draft deletion errors
      }

      return sendSuccess(
        res,
        'Property listing submitted successfully! Your listing has been registered and is waiting for Super Admin approval.',
        {
          propertyId: property.property_id,
          propertyName: property.property_name,
          status: property.status,
          hostName: req.user.full_name,
          hostId: property.host_id,
          createdAt: property.created_at
        },
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all properties listed by the currently authenticated host.
   */
  static async getMyListings(req, res, next) {
    try {
      const hostId = req.user.user_id;
      const properties = await PropertyModel.findByHostId(hostId);
      return sendSuccess(res, 'Host properties retrieved successfully.', {
        total: properties.length,
        properties
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Public discovery endpoint: returns ONLY listings approved by Super Admin.
   */
  static async getPublicListings(req, res, next) {
    try {
      const { city, propertyType } = req.query;
      const properties = await PropertyModel.findApproved({ city, propertyType });
      return sendSuccess(res, 'Public approved listings retrieved.', {
        total: properties.length,
        properties
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single property details by ID.
   */
  static async getPropertyById(req, res, next) {
    try {
      const { id } = req.params;
      const property = await PropertyModel.findById(id);

      if (!property) {
        return sendError(res, 'Property not found.', [], 404);
      }

      // If not approved, only host or admin can view
      if (property.status !== 'approved') {
        const callerId = req.user?.user_id;
        const callerRole = req.user?.role;
        const isOwner = callerId && callerId === property.host_id;
        const isAdmin = callerRole === 'admin' || callerRole === 'super_admin';

        if (!isOwner && !isAdmin) {
          return sendError(res, 'This listing is pending super admin approval.', [], 403);
        }
      }

      return sendSuccess(res, 'Property details retrieved.', { property });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Super Admin action: Approve or Reject a listing.
   * If approved, the listing becomes visible in the public search/listings.
   */
  static async updateApprovalStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, rejectionReason } = req.body;

      if (!['approved', 'rejected', 'waiting_for_approval'].includes(status)) {
        return sendError(res, 'Invalid status. Must be "approved", "rejected", or "waiting_for_approval".', [], 400);
      }

      if (status === 'rejected' && (!rejectionReason || !rejectionReason.trim())) {
        return sendError(res, 'A rejection reason is required when rejecting a listing.', [], 400);
      }

      const adminUserId = req.user.user_id;
      const updated = await PropertyModel.updateStatus(
        id,
        status,
        adminUserId,
        rejectionReason?.trim() || null
      );

      if (!updated) {
        return sendError(res, 'Property not found.', [], 404);
      }

      return sendSuccess(
        res,
        status === 'approved'
          ? 'Listing has been APPROVED! It is now live on TripVerse.'
          : 'Listing status updated.',
        {
          propertyId: updated.property_id,
          propertyName: updated.property_name,
          status: updated.status,
          approvedAt: updated.approved_at,
          rejectionReason: updated.rejection_reason
        }
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Super Admin endpoint: list all pending & all listings for moderation.
   */
  static async getAdminListings(req, res, next) {
    try {
      const { status } = req.query;
      const properties = await PropertyModel.findAllForAdmin(status || null);
      return sendSuccess(res, 'Admin listings retrieved.', {
        total: properties.length,
        properties
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Save or update an in-progress property listing draft.
   */
  static async saveDraft(req, res, next) {
    try {
      const userId = req.user.user_id;
      const { currentStep = 1, propertyName = '', draftData = {} } = req.body;

      const draft = await PropertyModel.saveDraft(
        userId,
        parseInt(currentStep, 10) || 1,
        propertyName?.trim() || 'My Stay Property',
        draftData
      );

      return sendSuccess(res, 'Listing draft saved successfully.', {
        draftId: draft.draft_id,
        currentStep: draft.current_step,
        propertyName: draft.property_name,
        updatedAt: draft.updated_at
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve active listing draft for the authenticated host.
   */
  static async getDraft(req, res, next) {
    try {
      const userId = req.user.user_id;
      const draft = await PropertyModel.getDraft(userId);

      return sendSuccess(res, draft ? 'Active listing draft found.' : 'No active draft found.', {
        hasDraft: !!draft,
        draft: draft || null
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Discard or delete the active listing draft.
   */
  static async deleteDraft(req, res, next) {
    try {
      const userId = req.user.user_id;
      await PropertyModel.deleteDraft(userId);
      return sendSuccess(res, 'Listing draft discarded successfully.');
    } catch (error) {
      next(error);
    }
  }
}

export default PropertyController;
