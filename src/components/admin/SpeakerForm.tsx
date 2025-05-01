import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { Speaker } from '../../types';
import Button from '../ui/Button';
import { FaUpload, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

interface SpeakerFormProps {
  speaker?: Speaker;
  onSuccess: () => void;
  onCancel: () => void;
}

const SpeakerForm: React.FC<SpeakerFormProps> = ({ speaker, onSuccess, onCancel }) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [socialInputs, setSocialInputs] = useState(
    speaker?.social.map(social => ({ type: social.type, url: social.url })) || 
    [{ type: 'linkedin', url: '' }]
  );

  const formik = useFormik({
    initialValues: {
      name: speaker?.name || '',
      position: speaker?.position || '',
      bio: speaker?.bio || '',
      role: speaker?.role || '',
      tags: speaker?.tags.join(', ') || '',
      featured: speaker?.featured || false,
      photo: speaker?.photo || '',
      photoFile: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      position: Yup.string().required('Required'),
      role: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        let photoURL = values.photo;
        
        // Upload photo if provided
        if (values.photoFile) {
          const fileRef = ref(storage, `speakers/${values.photoFile.name}`);
          await uploadBytes(fileRef, values.photoFile);
          photoURL = await getDownloadURL(fileRef);
        }
        
        const speakerData = {
          name: values.name,
          position: values.position,
          bio: values.bio,
          role: values.role,
          tags: values.tags.split(',').map(tag => tag.trim()),
          featured: values.featured,
          photo: photoURL,
          social: socialInputs.filter(social => social.url),
          sessions: speaker?.sessions || [],
        };
        
        if (speaker) {
          // Update existing speaker
          await updateDoc(doc(db, 'speakers', speaker.id), speakerData);
        } else {
          // Add new speaker
          await addDoc(collection(db, 'speakers'), speakerData);
        }
        
        onSuccess();
      } catch (error) {
        console.error('Error saving speaker:', error);
        // Handle error state
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      formik.setFieldValue('photoFile', event.target.files[0]);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue('photo', e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const addSocialInput = () => {
    setSocialInputs([...socialInputs, { type: 'linkedin', url: '' }]);
  };

  const removeSocialInput = (index: number) => {
    setSocialInputs(socialInputs.filter((_, i) => i !== index));
  };

  const updateSocialInput = (index: number, field: 'type' | 'url', value: string) => {
    const newInputs = [...socialInputs];
    newInputs[index][field] = value;
    setSocialInputs(newInputs);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">{speaker ? 'Edit Speaker' : 'Add New Speaker'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Basic Info */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.name && formik.errors.name 
                  ? 'border-error focus:ring-error-light' 
                  : 'border-border focus:ring-primary-light'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-error text-xs mt-1">{formik.errors.name}</div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-text-dark mb-1">
              Position *
            </label>
            <input
              id="position"
              name="position"
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.position && formik.errors.position 
                  ? 'border-error focus:ring-error-light' 
                  : 'border-border focus:ring-primary-light'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.position}
            />
            {formik.touched.position && formik.errors.position && (
              <div className="text-error text-xs mt-1">{formik.errors.position}</div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-text-dark mb-1">
              Role *
            </label>
            <input
              id="role"
              name="role"
              type="text"
              placeholder="e.g., Keynote Speaker, Panel Moderator"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.role && formik.errors.role 
                  ? 'border-error focus:ring-error-light' 
                  : 'border-border focus:ring-primary-light'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            />
            {formik.touched.role && formik.errors.role && (
              <div className="text-error text-xs mt-1">{formik.errors.role}</div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-text-dark mb-1">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="e.g., legal education, technology, ai (comma separated)"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              onChange={formik.handleChange}
              value={formik.values.tags}
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-text-dark">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                onChange={formik.handleChange}
                checked={formik.values.featured}
              />
              Featured Speaker
            </label>
          </div>
          
          {/* Social Media Links */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-text-dark">
                Social Media
              </label>
              <button
                type="button"
                className="text-primary hover:text-primary-dark text-sm focus:outline-none"
                onClick={addSocialInput}
              >
                <FaPlus className="inline mr-1" size={12} />
                Add
              </button>
            </div>
            
            {socialInputs.map((social, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={social.type}
                  onChange={(e) => updateSocialInput(index, 'type', e.target.value)}
                  className="w-1/3 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                </select>
                <input
                  type="text"
                  placeholder="URL"
                  value={social.url}
                  onChange={(e) => updateSocialInput(index, 'url', e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
                <button
                  type="button"
                  onClick={() => removeSocialInput(index)}
                  className="px-2 py-2 text-error hover:text-error-dark focus:outline-none"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-dark mb-1">
              Speaker Photo
            </label>
            <div className="mb-3 flex justify-center">
              <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-border">
                {formik.values.photo ? (
                  <img 
                    src={formik.values.photo} 
                    alt="Speaker preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-background flex items-center justify-center text-text-light">
                    No Photo
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <label className="cursor-pointer bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 rounded-md font-medium flex items-center gap-2">
                <FaUpload />
                Upload Photo
                <input
                  id="photoFile"
                  name="photoFile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            {uploadProgress !== null && (
              <div className="mt-2">
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-text-medium text-center mt-1">
                  {uploadProgress}% uploaded
                </div>
              </div>
            )}
          </div>
          
          {/* Speaker Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-text-dark mb-1">
              Biography
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              onChange={formik.handleChange}
              value={formik.values.bio}
            ></textarea>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="secondary"
          icon={<FaTimes />}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          icon={<FaSave />}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Saving...' : 'Save Speaker'}
        </Button>
      </div>
    </form>
  );
};

export default SpeakerForm;
