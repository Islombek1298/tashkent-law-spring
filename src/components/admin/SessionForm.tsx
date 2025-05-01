import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Session, Speaker } from '../../types';
import Button from '../ui/Button';
import { FaSave, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SessionFormProps {
  session?: Session;
  onSuccess: () => void;
  onCancel: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSuccess, onCancel }) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersCollection = collection(db, 'speakers');
        const speakersSnapshot = await getDocs(speakersCollection);
        const speakersList = speakersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Speaker[];
        
        setSpeakers(speakersList);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: session?.title || '',
      description: session?.description || '',
      date: session?.date ? new Date(session.date) : new Date(),
      startTime: session?.startTime || '09:00',
      endTime: session?.endTime || '09:30',
      location: session?.location || '',
      tag: session?.tag || '',
      category: session?.category || '',
      speakers: session?.speakers || [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      date: Yup.date().required('Required'),
      startTime: Yup.string().required('Required'),
      endTime: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const sessionData = {
          title: values.title,
          description: values.description,
          date: values.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          startTime: values.startTime,
          endTime: values.endTime,
          location: values.location,
          tag: values.tag,
          category: values.category,
          speakers: values.speakers,
        };
        
        if (session) {
          // Update existing session
          await updateDoc(doc(db, 'sessions', session.id), sessionData);
        } else {
          // Add new session
          await addDoc(collection(db, 'sessions'), sessionData);
        }
        
        onSuccess();
      } catch (error) {
        console.error('Error saving session:', error);
        // Handle error state
      }
    },
  });

  const handleSpeakerToggle = (speakerId: string) => {
    const currentSpeakers = [...formik.values.speakers];
    const speakerIndex = currentSpeakers.indexOf(speakerId);
    
    if (speakerIndex === -1) {
      // Add speaker
      currentSpeakers.push(speakerId);
    } else {
      // Remove speaker
      currentSpeakers.splice(speakerIndex, 1);
    }
    
    formik.setFieldValue('speakers', currentSpeakers);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">{session ? 'Edit Session' : 'Add New Session'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Session Details */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-text-dark mb-1">
              Session Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.title && formik.errors.title 
                  ? 'border-error focus:ring-error-light' 
                  : 'border-border focus:ring-primary-light'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-error text-xs mt-1">{formik.errors.title}</div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-text-dark mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-text-dark mb-1">
              Date *
            </label>
            <DatePicker
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue('date', date)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.date && formik.errors.date 
                  ? 'border-error focus:ring-error-light' 
                  : 'border-border focus:ring-primary-light'
              }`}
              dateFormat="MMMM d, yyyy"
            />
            {formik.touched.date && formik.errors.date && (
              <div className="text-error text-xs mt-1">{formik.errors.date}</div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-text-dark mb-1">
                Start Time *
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.startTime && formik.errors.startTime 
                    ? 'border-error focus:ring-error-light' 
                    : 'border-border focus:ring-primary-light'
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startTime}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <div className="text-error text-xs mt-1">{formik.errors.startTime}</div>
              )}
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-text-dark mb-1">
                End Time *
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.endTime && formik.errors.endTime 
                    ? 'border-error focus:ring-error-light' 
                    : 'border-border focus:ring-primary-light'
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endTime}
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <div className="text-error text-xs mt-1">{formik.errors.endTime}</div>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-text-dark mb-1">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.location && formik.errors.location 
                  ? 'border-error focus:ring-error-light' 
                  : 'border-border focus:ring-primary-light'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-error text-xs mt-1">{formik.errors.location}</div>
            )}
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-text-dark mb-1">
                Tag
              </label>
              <input
                id="tag"
                name="tag"
                type="text"
                placeholder="e.g., Keynote, Panel, Workshop"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                onChange={formik.handleChange}
                value={formik.values.tag}
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-dark mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.category && formik.errors.category 
                    ? 'border-error focus:ring-error-light' 
                    : 'border-border focus:ring-primary-light'
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option value="">Select a category</option>
                <option value="legal innovation">Legal Innovation</option>
                <option value="legal education">Legal Education</option>
                <option value="legal tech">Legal Tech</option>
                <option value="metaverse">Metaverse</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-error text-xs mt-1">{formik.errors.category}</div>
              )}
            </div>
          </div>
          
          {/* Speakers Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-dark mb-2">
              Speakers
            </label>
            
            <div className="border border-border rounded-md h-64 overflow-y-auto p-2">
              {speakers.length === 0 ? (
                <p className="text-text-light text-center py-4">No speakers found</p>
              ) : (
                <div className="space-y-2">
                  {speakers.map(speaker => (
                    <div 
                      key={speaker.id}
                      className={`p-2 rounded-md flex items-center gap-3 cursor-pointer transition-colors ${
                        formik.values.speakers.includes(speaker.id)
                          ? 'bg-primary-light'
                          : 'hover:bg-background'
                      }`}
                      onClick={() => handleSpeakerToggle(speaker.id)}
                    >
                      <div className="flex-shrink-0">
                        <input 
                          type="checkbox"
                          checked={formik.values.speakers.includes(speaker.id)}
                          readOnly
                          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <img 
                          src={speaker.photo}
                          alt={speaker.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/32';
                          }}
                        />
                        <div>
                          <div className="text-sm font-medium">{speaker.name}</div>
                          <div className="text-xs text-text-medium truncate">{speaker.position}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
          {formik.isSubmitting ? 'Saving...' : 'Save Session'}
        </Button>
      </div>
    </form>
  );
};

export default SessionForm;
