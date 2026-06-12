import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaChevronLeft,
  FaUpload,
  FaTrashAlt,
  FaFilePdf,
  FaImage,
} from 'react-icons/fa'

const BASE_URL = 'http://localhost:5000/api/v1'

export const VerifyPropertyOwnership = () => {
  const navigate = useNavigate()

  const [propertyAddress, setPropertyAddress] = useState(
    '12, Freedom Way, Lekki Phase 1'
  )
  const [propertyType, setPropertyType] = useState('3 Bedroom Flat')

  const [ownershipDoc, setOwnershipDoc] = useState(null)
  const [supportingDoc, setSupportingDoc] = useState(null)
  const [photos, setPhotos] = useState([])

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOwnershipChange = (e) => {
    const file = e.target.files[0]
    if (file) setOwnershipDoc(file)
  }

  const handleSupportingChange = (e) => {
    const file = e.target.files[0]
    if (file) setSupportingDoc(file)
  }

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files)
    setPhotos((prev) => [...prev, ...files])
  }

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const removeOwnership = () => setOwnershipDoc(null)
  const removeSupporting = () => setSupportingDoc(null)

  const handleSubmit = async () => {
    if (!propertyAddress.trim()) {
      setError('Property address is required')
      return
    }
    if (!propertyType.trim()) {
      setError('Property type is required')
      return
    }
    if (!ownershipDoc) {
      setError('Please upload an ownership document')
      return
    }
    if (photos.length === 0) {
      setError('Please upload at least one photo')
      return
    }

    setError('')
    setIsSubmitting(true)

    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('You are not logged in. Please log in and try again.')
      setIsSubmitting(false)
      navigate('/login')
      return
    }

    try {
      const formData = new FormData()

      formData.append('address', propertyAddress)
      formData.append('type', propertyType)

      formData.append('ownershipDocument', ownershipDoc)

      if (supportingDoc) {
        formData.append('supportingDocument', supportingDoc)
      }
      photos.forEach((photo) => {
        formData.append('photos', photo)
      })

      const response = await fetch(`${BASE_URL}/properties/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.message || 'Submission failed. Please try again.')
        return
      }
      navigate('/dashboard')
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFileIcon = (file) => {
    if (file.type === 'application/pdf')
      return <FaFilePdf className="text-error" />
    return <FaImage className="text-primary" />
  }

  return (
    <div className="min-h-screen bg-background-secondary font-sans pb-16">
      <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-border shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center"
          >
            <FaChevronLeft className="text-text-primary" />
          </button>
          <h1 className="text-h3 font-bold text-text-primary">
            Verify Property Ownership
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-body text-text-secondary mb-6">
          Let's verify that you own the property
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Property Address
            </label>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              placeholder="Enter property address"
              className="w-full border border-border rounded-xl px-4 py-3 text-body text-text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Property Type
            </label>
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              placeholder="e.g., 3 Bedroom Flat"
              className="w-full border border-border rounded-xl px-4 py-3 text-body text-text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Upload Ownership Document
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-background-hover border border-border rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-background-hover/80 transition">
                <FaUpload className="text-primary" />
                <span className="text-small text-text-primary">
                  Choose file
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleOwnershipChange}
                  className="hidden"
                />
              </label>
              {ownershipDoc && (
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                  {getFileIcon(ownershipDoc)}
                  <span className="text-small text-text-primary truncate max-w-[150px]">
                    {ownershipDoc.name}
                  </span>
                  <button
                    onClick={removeOwnership}
                    className="text-error hover:text-error/80"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-caption text-text-tertiary mt-2">
              Accepted formats: PDF, JPG, PNG (max 10MB)
            </p>
          </div>

          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Upload Supporting Document{' '}
              <span className="text-text-tertiary font-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-background-hover border border-border rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-background-hover/80 transition">
                <FaUpload className="text-primary" />
                <span className="text-small text-text-primary">
                  Choose file
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleSupportingChange}
                  className="hidden"
                />
              </label>
              {supportingDoc && (
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                  {getFileIcon(supportingDoc)}
                  <span className="text-small text-text-primary truncate max-w-[150px]">
                    {supportingDoc.name}
                  </span>
                  <button
                    onClick={removeSupporting}
                    className="text-error hover:text-error/80"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Upload Photos
            </label>
            <label className="cursor-pointer flex items-center justify-center w-full border-2 border-dashed border-border rounded-xl py-8 bg-white hover:bg-background-hover transition">
              <div className="text-center">
                <FaUpload className="mx-auto text-primary mb-2" size={24} />
                <span className="text-small text-text-primary">
                  Click or drag to upload photos
                </span>
                <p className="text-caption text-text-tertiary mt-1">
                  You can upload multiple images
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                  className="hidden"
                />
              </div>
            </label>

            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {photos.map((photo, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`preview ${idx}`}
                      className="w-full h-24 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-primary text-white font-semibold py-4 rounded-xl transition-all ${
              isSubmitting
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:opacity-90'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
