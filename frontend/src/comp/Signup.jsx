import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function signup() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/signup', {
            name,
            password,
          })
            let data = response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("name",name);
            navigate("/")
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };

    return (
        <div className="flex justify-center mt-56">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign un to our platform</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input title="w" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => {
                            setPass(e.target.value);
                        }} />
                    </div>
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Sign up</button>
                </div>
            </div>
        </div>
    );
}