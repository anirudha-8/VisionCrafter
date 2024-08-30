import React, { useState } from "react";

import { Card, FormField, Loader } from "../components";

function Home() {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);
	const [searchText, setSearchText] = useState("");

	return (
		<section>
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px] ">
					The Community Showcase
				</h1>
				<p className="max-w-[500px] mt-2 text-[#666e75] text-[15px]">
					Browse through a collection of imaginative and visually stunning
					images generated using DALL-E AI
				</p>
			</div>

			<div className="mt-16">
				<FormField />
			</div>

			<div className="mt-10">
				{loading ? (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				) : (
					<>
						{searchText && (
							<h2 className="font-medium text-[#666e75] text-xl mb-3">
								Showing results for{" "}
								<span className="text-[#222328]">{searchText}</span>{" "}
							</h2>
						)}
					</>
				)}
			</div>
		</section>
	);
}

export default Home;
