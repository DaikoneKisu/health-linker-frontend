import { getCase } from "../../../api/casos-clinicos";
import { getCaseFeedback } from "../../../api/feedback";

export const getCaseDataForPdf = async (id: number) => {
  try {
    const [caseData, feedbackList] = await Promise.all([
      getCase(id), getCaseFeedback(id),
    ]);

    // Handle errors
    if (!caseData.success) {
      throw new Error(String(caseData.error));
    }
    if (!feedbackList.success) {
      throw new Error(String(feedbackList.error));
    }

    return {
      success: true as const,
      medicalCase: caseData.data,
      feedback: feedbackList.data,
    };
  } catch (error) {
    console.error("Failed getting data for pdf", error);
    return { success: false as const, message: "Error solicitando datos para el archivo" };
  }
}
