import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

function CreatePost() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		prompt: "",
		photo: "",
	});

	const [generatingImg, setGeneratingImg] = useState(false);

	const [loading, setLoading] = useState(false);

	const generateImage = async () => {
		if (form.prompt) {
			try {
				setGeneratingImg(true);
				const response = await fetch("http://localhost:8080/api/v1/dalle", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt: form.prompt }),
				});

				// Check if the response is JSON
				const contentType = response.headers.get("content-type");

				if (!response.ok) {
					// Handle non-OK responses properly
					const errorData = await response.text(); // Capture the actual response text
					throw new Error(errorData || "Failed to generate image");
				}

				if (contentType && contentType.includes("application/json")) {
					const data = await response.json();
					if (data?.photo) {
						setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
					} else {
						alert("Failed to retrieve image from the server.");
					}
				} else {
					const errorText = await response.text(); // Capture non-JSON response
					throw new Error(errorText || "Server response is not in JSON format");
				}
			} catch (error) {
				alert(`Error: ${error.message}`);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert("Please, enter a prompt");
		}
	};

	const handleSubmit = () => {};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	return (
		<section className="max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px] ">Create</h1>
				<p className="max-w-[500px] mt-2 text-[#666e75] text-[15px]">
					Create imaginative and visually stunning images through DALL-E AI and
					share them with the community
				</p>
			</div>
			<form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Your name"
						type="text"
						name="name"
						placeholder="John Doe"
						value={form.name}
						handleChange={handleChange}
					/>
					<FormField
						labelName="Prompt"
						type="text"
						name="prompt"
						placeholder="A photo of a white fur monster standing in a purple room"
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>
					<div className="w-64 h-64 p-3 relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] flex justify-center items-center">
						{form.photo ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className="w-full h-full object-contain"
							/>
						) : (
							<img
								src={preview}
								alt="preview"
								className="w-9/12 h-9/12 object-contain opacity-40"
							/>
						)}
						{generatingImg && (
							<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
								<Loader />
							</div>
						)}
					</div>
				</div>
				<div className="mt-5 flex gap-5">
					<button
						type="button"
						onClick={generateImage}
						className="text-white bg-green-700 font-medium text-sm rounded-md w-full sm:w-auto text-center px-5 py-2.5"
					>
						{generatingImg ? "Generating..." : "Generate"}
					</button>
				</div>
				<div className="mt-10">
					<p className="mt-2 text-[#666e75] text-[14px]">
						Once you have created the image you want, you can share it with
						others in the community
					</p>
					<button
						type="submit"
						className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						{loading ? "Sharing..." : "Share with the community"}
					</button>
				</div>
			</form>
		</section>
	);
}

export default CreatePost;
