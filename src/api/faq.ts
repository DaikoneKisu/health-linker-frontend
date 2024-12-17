import axios from "axios";
import { FAQ } from "../pages/casos-clinicos/types";
import { SERVER } from "./server";

export const getFaqs = async () => {
    try {
        const token = localStorage.getItem("token")
        const {data: faqsFromBackend} = await axios.get(
            `${SERVER}/faq/all`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        return {
            success: true,
            data: faqsFromBackend
        };

    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                error: error
            }
        } else {
            console.error("Error inesperado");
            return { success: false, error: error}
        }
    }
};

export async function createFAQ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${SERVER}/faq`,
            { question, answer},
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        const data = response.data;

        return {
            success: true as const,
            data,
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false as const,
                error: error.response,
            };
        } else {
            console.error("Error inesperado: ", error);
            return { success: false as const, error: "Ocurrió un error"}
        }
    }
}