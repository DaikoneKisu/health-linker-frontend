import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { CasoClinico, Feedback } from "../types";

const styles = StyleSheet.create({
  header: {
    marginTop: "-0.5in",
    display: "flex",
    flexDirection: "row",
    height: "48",
  },
  headerImage: {
    height: "48",
    width: "auto",
    objectFit: "scale-down",
  },
  titleContainer: {
    textAlign: "center",
    marginHorizontal: "-1in",
    marginTop: 2,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: "extrabold",
    textAlign: "center",
  },
  page: {
    margin: "1in",
  },
  section: {
    marginVertical: 12,
  },
  subSection: {
    marginVertical: 6,
  },
  sectionTitle: {
    fontWeight: "extrabold",
    fontSize: 16,
    fontFamily: "Open Sans",
  },
  sectionSubtitle: {
    fontWeight: "demibold",
    fontSize: 14,
    fontFamily: "Open Sans",
  },
  sectionText: {
    fontSize: 12,
    fontFamily: "Open Sans",
  },
});

interface Props {
  medicalCase: CasoClinico;
  feedbackList: Feedback[];
}

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

/**
 * Documento de PDF del caso médico
 *
 * Usando react-pdf
 */
const PdfCaso = ({ medicalCase, feedbackList }: Props) => (
  <Document
    author="HealthLinker"
    title={`Documento del Caso nro-${medicalCase.id}`}
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View fixed style={styles.header}>
        <Image style={styles.headerImage} src="/favicon.png" />
        <Image style={styles.headerImage} src="/header-black.png" />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Caso médico #{medicalCase.id}</Text>
      </View>

      {/* Case data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Caso</Text>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>Descripción:</Text>
          <Text style={styles.sectionText}>{medicalCase.descripcionCaso}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>Valoración del paciente:</Text>
          <Text style={styles.sectionText}>
            {medicalCase.valoracionPaciente}
          </Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>
            Motivo por el que se pidió mentoría:
          </Text>
          <Text style={styles.sectionText}>{medicalCase.motivoMentoria}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>Especialidad requerida:</Text>
          <Text style={styles.sectionText}>
            {medicalCase.especialidadRequerida}
          </Text>
        </View>
      </View>

      {/* Patient data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Paciente</Text>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>Fecha de nacimiento:</Text>
          <Text style={styles.sectionText}>{medicalCase.fechaNacimiento}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>Género:</Text>
          <Text style={styles.sectionText}>{medicalCase.genero}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.sectionSubtitle}>
            Motivo por el que el paciente pidió consulta:
          </Text>
          <Text style={styles.sectionText}>{medicalCase.motivoPaciente}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Retroalimentaciones</Text>
        {feedbackList.map((feedback) => (
          <View key={feedback.id} style={styles.subSection}>
            <Text style={styles.sectionSubtitle}>
              {feedback.autor} ({feedback.rol}) el {feedback.fecha} a las{" "}
              {feedback.hora}
            </Text>
            <Text style={styles.sectionText}>{feedback.texto}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PdfCaso;
