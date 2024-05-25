import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Mention } from 'primereact/mention';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TenantRegistration() {
    const location = useLocation();
    const [userName, setUserName] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        notes: '',
        workEmail: '',
        workPhone: '',
        workLocation: '',
        workNotes: '',
        drivingLicenseFile: '',
        creditReportFile: '',
        documentsNotes: ''
    });

    useEffect(() => {
        if (location.state && location.state.userName) {
            setUserName(location.state.userName);
        }
    }, [location]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileUpload = (event, name) => {
        const file = event.files[0];
        setFormData((prevState) => ({
            ...prevState,
            [name]: file
        }));
    };

    const handleSubmit = () => {
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        fetch('http://localhost:8081/Post/TenantRegistration', {
            method: 'POST',
            body: data
        })
        .then((response) => response.json())
        .then((data) => {
            alert('Registration successful');
            // Optionally, redirect to another page
        })
        .catch((error) => {
            console.error('Error registering tenant:', error);
            alert('Error registering tenant. Please try again.');
        });
    };

    return (
        <div className="layout-dashboard">
            <header className="card surface-100">
                <h6 className="m-0">Tenant Registration Form</h6>
                <h6 className="m-0">Welcome, {userName}</h6>
            </header>
            <main>
                <section className="card">
                    <Fieldset legend="Personal Details">
                        <div className="grid">
                            <div className="md:col-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="firstName">First Name:</label>
                                    <InputText id="firstName" className="p-inputtext-lg" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="md:col-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <InputText id="lastName" className="p-inputtext-lg" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="md:col-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="phone">Phone Number:</label>
                                    <InputText id="phone" className="p-inputtext-lg" name="phone" value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="md:col-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="email">Email:</label>
                                    <InputText id="email" className="p-inputtext-lg" name="email" value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="notes">Notes (Personal):</label>
                                    <Mention id="notes" name="notes" field="notes" placeholder="Notes" rows={5} cols={100} inputClassName="w-full" autoResize value={formData.notes} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </Fieldset>
                </section>
                <section className="card">
                    <Fieldset legend="Work Details">
                        <div className="grid">
                            <div className="md:col-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="workEmail">Work Email:</label>
                                    <InputText id="workEmail" className="p-inputtext-lg" name="workEmail" value={formData.workEmail} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="md:col-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="workPhone">Work Phone Number:</label>
                                    <InputText id="workPhone" className="p-inputtext-lg" name="workPhone" value={formData.workPhone} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="md:col-6">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="workLocation">Work Location (Address):</label>
                                    <InputText id="workLocation" className="p-inputtext-lg" name="workLocation" value={formData.workLocation} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="workNotes">Notes (Work):</label>
                                    <Mention id="workNotes" name="workNotes" field="workNotes" placeholder="Work Notes" rows={5} cols={100} inputClassName="w-full" autoResize value={formData.workNotes} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </Fieldset>
                </section>
                <section className="card">
                    <Fieldset legend="Documents">
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="drivingLicenseFile">Driving License (upload):</label>
                                    <div className="card">
                                        <FileUpload
                                            id="drivingLicenseFile"
                                            name="drivingLicenseFile"
                                            customUpload
                                            uploadHandler={(event) => handleFileUpload(event, 'drivingLicenseFile')}
                                            accept="image/*"
                                            maxFileSize={1000000}
                                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="creditReportFile">Credit Report (upload):</label>
                                    <div className="card">
                                        <FileUpload
                                            id="creditReportFile"
                                            name="creditReportFile"
                                            customUpload
                                            uploadHandler={(event) => handleFileUpload(event, 'creditReportFile')}
                                            accept="image/*"
                                            maxFileSize={1000000}
                                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="documentsNotes">Notes (Documents):</label>
                                    <Mention
                                        id="documentsNotes"
                                        name="documentsNotes"
                                        field="documentsNotes"
                                        placeholder="Documents Notes"
                                        rows={5}
                                        cols={100}
                                        inputClassName="w-full"
                                        autoResize
                                        value={formData.documentsNotes}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </Fieldset>
                </section>
                <section>
                    <div className="mt-3 text-center">
                        <Button label="Submit" className="md:px-5" onClick={handleSubmit} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TenantRegistration;
