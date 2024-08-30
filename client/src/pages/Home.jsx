import React, { useState } from "react";

import { Card, FormField, Loader } from "../components";

function Home() {
	const [loading, setLoading] = useState(false);

	const [allPosts, setAllPosts] = useState(null);

	return <div>Home</div>;
}

export default Home;
