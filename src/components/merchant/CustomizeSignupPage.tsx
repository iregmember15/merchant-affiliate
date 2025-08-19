import React, { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon, PhotoIcon } from '@heroicons/react/24/outline';

type FormDataType = {
  pageTitle: string;
  pageDescription: string;
  welcomeMessage: string;
  primaryColor: string;
  logo: string; // base64
  termsAndConditions: string;
  commissionRate: string;
  minimumPayout: string;
  paymentMethods: string[];
  referralBaseUrl: string;

  showFields: {
    name: boolean;
    email: boolean;
    website: boolean;
    socials: boolean;
  };
  requiredFields: {
    name: boolean;
    email: boolean;
    website: boolean;
    socials: boolean;
  };

  captchaEnabled: boolean;
  captchaSiteKey: string;
  gdprEnabled: boolean;
  gdprText: string;

  autoApprove: boolean;

  addOns: { name: string; description: string; price: number }[];
};

const DEFAULT: FormDataType = {
  pageTitle: 'Join Our Affiliate Program',
  pageDescription: 'Start earning commissions by promoting our products',
  welcomeMessage: 'Welcome to our affiliate program!',
  primaryColor: '#3B82F6',
  logo: '',
  termsAndConditions: 'By joining our affiliate program, you agree to...',
  commissionRate: '10%',
  minimumPayout: '$50',
  paymentMethods: ['PayPal', 'Stripe', 'Bank Transfer'],
  referralBaseUrl: 'https://affiliatepro.com',
  showFields: { name: true, email: true, website: true, socials: true },
  requiredFields: { name: true, email: true, website: false, socials: false },
  captchaEnabled: false,
  captchaSiteKey: '',
  gdprEnabled: true,
  gdprText: 'I agree to the Terms & Privacy Policy.',
  autoApprove: true,
  addOns: [
    { name: 'Extra Training', description: 'One-on-one coaching', price: 20 },
    { name: 'Marketing Kit', description: 'Promotional graphics & templates', price: 15 },
  ],
};

// small helper
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function CustomizeSignupPage(): JSX.Element {
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<FormDataType>(DEFAULT);
  const [loading, setLoading] = useState(false);

  // pending signups (preview / merchant admin simulation)
  const [pendingSignups, setPendingSignups] = useState<any[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<boolean[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('affiliate_signup_customization');
    if (raw) {
      try {
        setFormData(JSON.parse(raw));
      } catch (e) {
        console.warn('Invalid saved customization, clearing.');
        localStorage.removeItem('affiliate_signup_customization');
      }
    }
  }, []);

  useEffect(() => {
    setSelectedAddOns(formData.addOns.map(() => false));
  }, [formData.addOns]);

  const save = () => {
    localStorage.setItem('affiliate_signup_customization', JSON.stringify(formData));
  };

  const resetToDefault = () => {
    setFormData(DEFAULT);
    localStorage.removeItem('affiliate_signup_customization');
    setSelectedAddOns(DEFAULT.addOns.map(() => false));
  };

  const handleInputChange = (field: keyof FormDataType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value } as FormDataType));
  };

  const handleNestedChange = (group: 'showFields' | 'requiredFields', key: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [group]: { ...(prev as any)[group], [key]: value } } as FormDataType));
  };

  const handleLogoUpload = (file?: File) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo must be smaller than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      handleInputChange('logo', (reader.result as string) || '');
    };
    reader.readAsDataURL(file);
  };

  // small helper to remove payment method
  const togglePaymentMethod = (method: string) => {
    setFormData(prev => {
      const exists = prev.paymentMethods.includes(method);
      const paymentMethods = exists
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method];
      return { ...prev, paymentMethods } as FormDataType;
    });
  };

  // Add-On handlers
  const addAddon = () => {
    const name = prompt('Enter add-on name');
    if (!name) return;
    const description = prompt('Enter add-on description') || '';
    const priceStr = prompt('Enter add-on price (USD)') || '0';
    const price = parseFloat(priceStr) || 0;
    setFormData(prev => ({ ...prev, addOns: [...prev.addOns, { name, description, price }] }));
  };

  const removeAddon = (index: number) => {
    setFormData(prev => ({ ...prev, addOns: prev.addOns.filter((_, i) => i !== index) }));
  };

  const toggleSelectedAddOn = (index: number) => {
    setSelectedAddOns(prev => prev.map((val, i) => (i === index ? !val : val)));
  };

  const totalAddOnsPrice = selectedAddOns.reduce((acc, selected, idx) => {
    return acc + (selected ? formData.addOns[idx].price : 0);
  }, 0);

  // Save on every change (debounce would be better; keeping simple)
  useEffect(() => {
    save();
  }, [formData]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Customize Signup Page</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {previewMode ? (
                <>
                  <EyeSlashIcon className="h-5 w-5 mr-2" />
                  Hide Preview
                </>
              ) : (
                <>
                  <EyeIcon className="h-5 w-5 mr-2" />
                  Preview Signup Page
                </>
              )}
            </button>

            <button
              onClick={() => { save(); alert('Settings saved to localStorage (merchant preview).'); }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Customization Form */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Page Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                  <input
                    type="text"
                    value={formData.pageTitle}
                    onChange={(e) => handleInputChange('pageTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label>
                  <textarea
                    value={formData.pageDescription}
                    onChange={(e) => handleInputChange('pageDescription', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                  <textarea
                    value={formData.welcomeMessage}
                    onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Referral Base URL</label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={formData.referralBaseUrl}
                      onChange={(e) => handleInputChange('referralBaseUrl', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <div className="text-xs text-gray-500 px-3 py-2 rounded-md border border-gray-200">Example: https://affiliatepro.com</div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Referral link format preview: <span className="font-mono">{formData.referralBaseUrl}/?ref=USERNAME</span></p>
                </div>
              </div>
            </div>

            {/* Design Settings, Program Settings ... Keep exactly same */}

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add-Ons</h3>
              <div className="space-y-2">
                {formData.addOns.map((a, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{a.name} - ${a.price}</div>
                      <div className="text-sm text-gray-500">{a.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => removeAddon(idx)} className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm">Remove</button>
                    </div>
                  </div>
                ))}
                <button onClick={addAddon} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm mt-2">Add Add-On</button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button onClick={resetToDefault} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Reset to Default</button>
              <button onClick={() => { save(); alert('Settings saved to localStorage (merchant preview).'); }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
          </div>

          {/* Preview / Signup Page */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>

            <div className="border border-gray-200 rounded-lg p-6" style={{ backgroundColor: formData.primaryColor + '10' }}>
              <div className="text-center mb-6">
                {formData.logo ? <img src={formData.logo} alt="logo" className="mx-auto h-12 object-contain mb-2" /> : null}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.pageTitle}</h1>
                <p className="text-gray-600">{formData.pageDescription}</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <SignupPreview
                  settings={formData}
                  selectedAddOns={selectedAddOns}
                  toggleSelectedAddOn={toggleSelectedAddOn}
                  totalAddOnsPrice={totalAddOnsPrice}
                  onCreatePending={(payload: any) => setPendingSignups(prev => [...prev, payload])}
                />

                {/* Merchant Admin Area ... Keep same */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Signup Preview with Add-Ons selectable
function SignupPreview({
  settings,
  onCreatePending,
  selectedAddOns,
  toggleSelectedAddOn,
  totalAddOnsPrice,
}: {
  settings: FormDataType;
  onCreatePending?: (p: any) => void;
  selectedAddOns: boolean[];
  toggleSelectedAddOn: (idx: number) => void;
  totalAddOnsPrice: number;
}) {
  const [form, setForm] = useState({ name: '', email: '', website: '', socials: '' });
  const [consent, setConsent] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false); // mock captcha
  const [message, setMessage] = useState<string | null>(null);
  const [approvedAffiliate, setApprovedAffiliate] = useState<any | null>(null);

  const handleChange = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.gdprEnabled && !consent) return alert('Please agree to GDPR.');
    if (settings.captchaEnabled && !captchaChecked) return alert('Please pass CAPTCHA.');
    const payload = { ...form, addOns: selectedAddOns.map((sel, idx) => (sel ? settings.addOns[idx] : null)).filter(Boolean) };
    setMessage('Affiliate registered! Pending approval.');
    onCreatePending?.(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {settings.showFields.name && <input type="text" placeholder="Name" value={form.name} onChange={e => handleChange('name', e.target.value)} className="w-full border px-3 py-2 rounded-md" />}
      {settings.showFields.email && <input type="email" placeholder="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="w-full border px-3 py-2 rounded-md" />}
      {settings.showFields.website && <input type="text" placeholder="Website" value={form.website} onChange={e => handleChange('website', e.target.value)} className="w-full border px-3 py-2 rounded-md" />}
      {settings.showFields.socials && <input type="text" placeholder="Socials" value={form.socials} onChange={e => handleChange('socials', e.target.value)} className="w-full border px-3 py-2 rounded-md" />}

      {/* Add-Ons selection */}
      {settings.addOns.length > 0 && (
        <div className="border p-2 rounded-md">
          <p className="font-medium mb-2">Add-Ons (optional):</p>
          {settings.addOns.map((a, idx) => (
            <label key={idx} className="flex items-center justify-between mb-1">
              <span>
                {a.name} (${a.price})
              </span>
              <input type="checkbox" checked={selectedAddOns[idx]} onChange={() => toggleSelectedAddOn(idx)} />
            </label>
          ))}
          <div className="text-sm font-medium mt-2">Total Add-Ons: ${totalAddOnsPrice}</div>
        </div>
      )}

      {settings.gdprEnabled && (
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
          <span className="text-sm">{settings.gdprText}</span>
        </label>
      )}

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md w-full">Join Now</button>

      {message && <div className="mt-2 text-green-600">{message}</div>}
    </form>
  );
}
