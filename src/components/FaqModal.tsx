import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronForward, trash } from "ionicons/icons";
import styles from "./FaqModal.module.css";
import { useEffect, useState } from "react";
import { FAQ } from "../pages/casos-clinicos/types";
import { getFaqs, createFAQ, deleteFAQ } from "../api/faq";


export function FaqModal({
  dismiss,
}: {
  dismiss: (data?: string | null | undefined | number, role?: string) => void;
}) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const[newQuestion, setNewQuestion] = useState<string>('');
  const[newAnswer, setNewAnswer] = useState<string>('');
  const[creating, setCreating] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [faqToDelete, setFaqToDelete] = useState<number | null>(null);
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getFaqs();
        if (response.success) {
          setFaqs(response.data);
        } else {
          setError('Error al obtener las preguntas frecuentes.');
          console.error(response.error);
        }
      } catch (err) {
        setError('Error al obtener las preguntas frecuentes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const [selectedQuestion, setSelectedQuestion] = useState<
    (typeof faqs)[number] | null
  >(null);

  const handleCreateFaq = async () => {
    setCreating(true);
    try {
      const response = await createFAQ({ question: newQuestion, answer: newAnswer });
      if (response?.success) {
        setFaqs([...faqs, response.data])
        setNewQuestion('');
        setNewAnswer('');
      } else {
        setError('Error al crear la pregunta frecuente');
        console.error(response?.error);
      }
    } catch (error) {
      setError("Error al crear la pregunta frecuente. ");
      console.error(error)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteFaq = async (id: number) => {
    try {
      const response = await deleteFAQ(id);
      if (response.success) {
        setFaqs(faqs.filter(faq => faq.id !== id));
      } else {
        setError("Error al eliminar la pregunta frecuente.");
        console.error(response.error);
      }
    } catch (error) {
      setError("Error al eliminar la pregunta frecuente.");
      console.error(error);
    }
  }

  const confirmDeleteFaq = (id:number) => {
    setFaqToDelete(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    if (faqToDelete) {
      await handleDeleteFaq(faqToDelete);
      setFaqToDelete(null);
      setShowAlert(false);
    }
  }

  return (
    <IonPage>
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonTitle>Preguntas frecuentes</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className={`${styles.faqToolbarBtn}`}
              onClick={() => dismiss()}
            >
              Cerrar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading} message={'Cargando...'} />
        {error && <div>{error}</div>}
        {!loading && !error &&!selectedQuestion && (
          <>
            <IonList className="ion-padding">
              {faqs.map((faq, i) => (
                <IonItem key={i} >
                  <IonLabel onClick={() => setSelectedQuestion(faq)}>{faq.question}</IonLabel>
                  <IonIcon slot="end" icon={chevronForward} />
                  <IonIcon slot="end" icon={trash} onClick={() => confirmDeleteFaq(faq.id)} />
                </IonItem>
              ))}
            </IonList>
            <div className="ion-padding">
              <IonInput
                value={newQuestion}
                placeholder="Nueva pregunta"
                onIonChange={(e) => setNewQuestion(e.detail.value!)}
              />
              <IonTextarea 
                value={newAnswer}
                placeholder="Respuesta"
                onIonChange={(e) => setNewAnswer(e.detail.value!)}
              />
              <IonButton onClick={handleCreateFaq} disabled={creating}>
                {creating ? 'Creando...' : 'Crear Pregunta Frecuente'}
              </IonButton>
            </div>
          </>
        )}

        {selectedQuestion && (
          <div className={`ion-padding ${styles.faqContainer}`}>
            <h3>{selectedQuestion.question}</h3>
            <IonText>{selectedQuestion.answer}</IonText>
            <IonButton onClick={() => setSelectedQuestion(null)}>
              Entendido
            </IonButton>
          </div>
        )}

        <IonAlert 
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Confirmar Eliminación"}
          message={"¿Estás seguro de que deseas eliminar esta pregunta frecuente?"}
          buttons={[
            {
              text: "Calcelar",
              role: "cancel",
              handler: () => {
                setShowAlert(false);
                setFaqToDelete(null);
              }
            },
            {
              text: "Eliminar",
              handler: handleConfirmDelete
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
}
