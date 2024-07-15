import { useQuery } from "@tanstack/react-query";

type Data = {
	name: string;
	description: string;
};

export const fetchData = (): Promise<Data[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					name: "Title 1",
					description: "Description 1",
				},
				{
					name: "Title 2",
					description: "Description 2",
				},
			] as Data[]);
		}, 1000);
	});
};

export const usePostsQuery = () => {
	return useQuery<Data[]>({
		queryKey: ["postsData"],
		queryFn: fetchData,
	});
};

export const Posts = ({ title }: { title: string }) => {
	const { status, isFetching, error, data } = usePostsQuery();

	if (status === "pending") return "Loading...";

	if (error) return "An error occured" + error.message;

	return (
		<div style={{ padding: 20 }}>
			<h1>{title}</h1>
			{isFetching ? <p>Refetching...</p> : null}
			{data.map((item) => (
				<div key={item.name}>
					<h3>{item.name}</h3>
				</div>
			))}
		</div>
	);
};

function App() {
	return (
		<>
			<div style={{ display: "flex" }}>
				<Posts title='Post 1' />
				<Posts title='Post 2' />
			</div>
		</>
	);
}

export default App;
