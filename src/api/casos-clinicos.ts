import { SERVER } from "./server";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";

export const getCases = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${SERVER}/clinical-cases`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return {
			success: true,
			data: response.data,
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {
				success: false,
				error: error,
			};
		} else {
			console.error("Error inesperado:", error);
			return { success: false, error: "Error inesperado" };
		}
	}
};

export const getCasesCurrentUser = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${SERVER}/clinical-cases/current-user`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return {
			success: true,
			data: response.data,
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {
				success: false,
				error: error,
			};
		} else {
			console.error("Error inesperado:", error);
			return { success: false, error: "Error inesperado" };
		}
	}
};

export const getOpenCasesCurrentUser = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(
			`${SERVER}/clinical-cases/open/current-user`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		return {
			success: true,
			data: response.data,
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {
				success: false,
				error: error,
			};
		} else {
			console.error("Error inesperado:", error);
			return { success: false, error: "Error inesperado" };
		}
	}
};
