import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Tab } from '@headlessui/react';
import { Plus, Trash2, Edit2, List, Settings, Layout, Check } from 'lucide-react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function HeroSlides({ auth, slides, siteSettings = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        image: null,
        color: 'bg-[#FFF8F3]',
        order: 0,
        is_active: true,
    });

    const { data: settingsData, setData: setSettingsData, post: postSettings, processing: settingsProcessing } = useForm({
        settings: {
            header_phone: siteSettings.header_phone || '',
            header_email: siteSettings.header_email || '',
            header_logo: null,
            footer_about: siteSettings.footer_about || '',
            footer_fb: siteSettings.footer_fb || '',
            footer_ig: siteSettings.footer_ig || '',
            footer_copyright: siteSettings.footer_copyright || '© 2024 Kengu.',
        }
    });

    const [editingSlide, setEditingSlide] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        let url = null;
        if (data.image instanceof File) {
            url = URL.createObjectURL(data.image);
            setPreviewUrl(url);
        } else if (editingSlide) {
            setPreviewUrl(editingSlide.image_url || editingSlide.image);
        } else {
            setPreviewUrl(null);
        }

        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [data.image, editingSlide]);

    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        postSettings(route('admin.settings.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const updateSettingField = (key, value) => {
        setSettingsData('settings', { ...settingsData.settings, [key]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSlide) {
            post(route('admin.hero-slides.update', editingSlide.id), {
                forceFormData: true,
                _method: 'put',
                onSuccess: () => {
                    reset();
                    setEditingSlide(null);
                    setSelectedIndex(0);
                },
            });
        } else {
            post(route('admin.hero-slides.store'), {
                onSuccess: () => {
                    reset();
                    setSelectedIndex(0);
                },
            });
        }
    };

    const deleteSlide = (id) => {
        if (confirm('ნამდვილად გსურთ სლაიდის წაშლა?')) {
            router.delete(route('admin.hero-slides.destroy', id));
        }
    };

    const editSlide = (slide) => {
        setEditingSlide(slide);
        setData({
            title: slide.title,
            subtitle: slide.subtitle,
            image: null,
            color: slide.color,
            order: slide.order,
            is_active: slide.is_active,
        });
        setSelectedIndex(1);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header slides={[]} siteSettings={siteSettings} />
            <Head title="Hero Slides Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-8">
                                <Tab className={({ selected }) => classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                                    'focus:outline-none ring-offset-2 ring-offset-orange-400',
                                    selected ? 'bg-white text-orange-700 shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-orange-600'
                                )}>
                                    <div className="flex items-center justify-center gap-2">
                                        <List size={18} />
                                        არსებული სლაიდები
                                    </div>
                                </Tab>
                                <Tab className={({ selected }) => classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                                    'focus:outline-none ring-offset-2 ring-offset-orange-400',
                                    selected ? 'bg-white text-orange-700 shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-orange-600'
                                )}>
                                    <div className="flex items-center justify-center gap-2">
                                        <Plus size={18} />
                                        {editingSlide ? 'სლაიდის რედაქტირება' : 'ახალი სლაიდის დამატება'}
                                    </div>
                                </Tab>
                                <Tab className={({ selected }) => classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                                    'focus:outline-none ring-offset-2 ring-offset-orange-400',
                                    selected ? 'bg-white text-orange-700 shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-orange-600'
                                )}>
                                    <div className="flex items-center justify-center gap-2">
                                        <Settings size={18} />
                                        Header & Footer
                                    </div>
                                </Tab>
                            </Tab.List>

                            <Tab.Panels>
                                <Tab.Panel className="rounded-xl bg-white focus:outline-none">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {slides.map((slide) => (
                                            <div key={slide.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <div className={`h-40 flex items-center justify-center p-4 ${slide.color}`}>
                                                    <img src={slide.image_url || slide.image} alt={slide.title} className="h-full object-contain" />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-lg">{slide.title}</h3>
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{slide.subtitle}</p>
                                                    <div className="mb-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${slide.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {slide.is_active ? 'აქტიური' : 'არააქტიური'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">რიგი: {slide.order}</span>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => editSlide(slide)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                                                            <button onClick={() => deleteSlide(slide.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Panel>

                                <Tab.Panel className="rounded-xl bg-white focus:outline-none">
                                    {/* Slide Preview Area */}
                                    <div className="mb-10 p-6 border border-gray-100 bg-white rounded-3xl shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Layout size={14} /> ცოცხალი ხედვა
                                            </h3>
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            </div>
                                        </div>
                                        
                                        <div className={`relative h-[350px] w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ${data.color || 'bg-white'}`}>
                                            <div className="mx-auto flex h-full max-w-5xl items-center justify-center gap-10 px-10">
                                                <div className="flex flex-col items-start text-left max-w-md">
                                                    <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF9244]">
                                                        ახალი კოლექცია
                                                    </span>
                                                    <h1 className="mb-4 text-3xl font-black tracking-tight text-gray-900 leading-[1.1]">
                                                        {data.title || 'აქ ჩაწერეთ სათაური'}
                                                    </h1>
                                                    <p className="mb-6 text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                        {data.subtitle || 'აქ გამოჩნდება სლაიდის აღწერილობა, რომელიც დაეხმარება მომხმარებელს გაიგოს მეტი კოლექციის შესახებ.'}
                                                    </p>
                                                    <div className="inline-block rounded-xl bg-[#FF9244] px-8 py-3 text-xs font-black text-white shadow-xl shadow-orange-200">
                                                        ნახე პროდუქცია
                                                    </div>
                                                </div>
                                                
                                                <div className="relative flex-1 h-full flex items-center justify-center">
                                                    <div className="absolute inset-0 bg-orange-100/60 rounded-full blur-3xl animate-pulse scale-75" />
                                                    {previewUrl ? (
                                                        <img
                                                            src={previewUrl}
                                                            alt="Preview"
                                                            className="relative z-10 h-[85%] w-auto object-contain drop-shadow-2xl"
                                                        />
                                                    ) : (
                                                        <div className="relative z-10 w-32 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-300 gap-2">
                                                            <Plus size={24} />
                                                            <span className="text-[10px] font-bold">სურათი</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-gray-50 p-6 rounded-2xl">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">სათაური</label>
                                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">ქვესათაური</label>
                                            <textarea value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                            {errors.subtitle && <div className="text-red-500 text-sm mt-1">{errors.subtitle}</div>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">ფონი (Tailwind Class)</label>
                                                <input type="text" value={data.color} onChange={e => setData('color', e.target.value)} placeholder="bg-[#FFF8F3]" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">რიგითობა</label>
                                                <input type="number" value={data.order} onChange={e => setData('order', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.is_active}
                                                    onChange={e => setData('is_active', e.target.checked)}
                                                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">გამოჩნდეს საიტზე (აქტიური)</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">სურათი</label>
                                            <input type="file" onChange={e => setData('image', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                                            {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button type="submit" disabled={processing} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50">{editingSlide ? 'განახლება' : 'შენახვა'}</button>
                                            {editingSlide && <button type="button" onClick={() => {setEditingSlide(null); reset(); setSelectedIndex(0);}} className="text-gray-600 hover:text-gray-900">გაუქმება</button>}
                                        </div>
                                    </form>
                                </Tab.Panel>

                                <Tab.Panel className="rounded-xl bg-white focus:outline-none">
                                    <form onSubmit={handleSettingsSubmit} className="space-y-8 max-w-4xl mx-auto bg-white p-8 border rounded-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-gray-900 border-b pb-2">Header-ის პარამეტრები</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">ტელეფონი</label>
                                                    <input type="text" value={settingsData.settings.header_phone} onChange={e => updateSettingField('header_phone', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">ელ-ფოსტა</label>
                                                    <input type="email" value={settingsData.settings.header_email} onChange={e => updateSettingField('header_email', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">ლოგო</label>
                                                    <input type="file" onChange={e => updateSettingField('header_logo', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500" />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="font-bold text-gray-900 border-b pb-2">Footer-ის პარამეტრები</h4>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">ჩვენს შესახებ (ტექსტი)</label>
                                                    <textarea value={settingsData.settings.footer_about} onChange={e => updateSettingField('footer_about', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Facebook ლინკი</label>
                                                    <input type="text" value={settingsData.settings.footer_fb} onChange={e => updateSettingField('footer_fb', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Instagram ლინკი</label>
                                                    <input type="text" value={settingsData.settings.footer_ig} onChange={e => updateSettingField('footer_ig', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-end pt-4 border-t">
                                            <button type="submit" disabled={settingsProcessing} className="inline-flex items-center gap-2 py-2 px-6 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-green-600 hover:bg-green-700">
                                                <Check size={18} /> შენახვა
                                            </button>
                                        </div>
                                    </form>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
            <Footer siteSettings={siteSettings} />
        </div>
    );
}
