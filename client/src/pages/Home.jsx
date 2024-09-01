import React, { useState } from "react";

// import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((img) => <Card key={img._id} {...img} />);
	}
	return (
		<h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase ">
			{title}
		</h2>
	);
};

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
						<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
							{searchText ? (
								<RenderCards data={[]} title="No search results found" />
							) : (
								<RenderCards data={[]} title="No posts found" />
							)}
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default Home;
