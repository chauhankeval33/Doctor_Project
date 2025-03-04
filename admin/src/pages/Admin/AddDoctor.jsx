import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { admin_context } from '../../context/admin_context'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {



    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 year");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [degree, setDegree] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const { backendUrl, aToken } = useContext(admin_context)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!docImg) {
                return toast.error("image is required")
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            //consolelog the form data
            
            formData.forEach((key, value) => {
                console.log(`${key}:${value}`);
            })

            const { data } = await axios.post(backendUrl + "/api/admin/add-doctor", formData, { headers : { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setAbout("");
                setName("");
                setEmail("");
                setPassword("");
                setExperience("1 year");
                setFees("");
                setSpeciality("General physician");
                setDegree("");
                setAddress1("");
                setAddress2("");
                
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }
    }





    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
                {/* Doctor Image Upload Section */}
                <div className='flex items-center mb-8 gap-4 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload Area" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>Upload doctor <br />picture</p>
                </div>

                {/* Form Fields */}
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='Fees' required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Neurologist">Neurologist</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='Education' required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder='Address 1' required className="w-full p-2 border border-gray-300 rounded-md mb-2" />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder='Address 2' required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>

                    {/* About Doctor */}
                    <div className='w-full lg:w-1/2'>
                        <div className='mb-4'>
                            <p className='text-sm font-medium mb-1'>About Doctor</p>
                            <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder='Write About Doctor' rows={5} required className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className='flex justify-center'>
                    <button type="submit" className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Add Doctor</button>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor
