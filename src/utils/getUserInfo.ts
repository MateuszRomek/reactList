interface Data {
	name: string;
	email: string;
	userId: string;
}
const getUserInfo = async (): Promise<false | Data> => {
	const t = localStorage.getItem('token');
	try {
		const response = await fetch('http://localhost:8080/user/inf', {
			method: 'POST',
			headers: {
				Authorization: `Bearer  ${t}`,
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		if (data.status !== 200) {
			return false;
		} else {
			return data;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
};

export default getUserInfo;
