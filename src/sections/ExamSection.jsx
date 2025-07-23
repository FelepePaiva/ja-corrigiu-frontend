// src/sections/ExamSection.jsx

import CreateExamSection from "./CreateExamSection";
import TeachersExamsSection from "./TeachersExamsSection";

const ExamSection = ({ token, teacherId, classes }) => {
  return (
    <>
      <h2>Gerenciar Provas</h2>
      <hr style={{ margin: "18px 0" }} />

      <CreateExamSection
        token={token}
        teacherId={teacherId}
        classes={classes}
      />

      <hr style={{ margin: "32px 0" }} />

      <TeachersExamsSection
        token={token}
        teacherId={teacherId}
      />
    </>
  );
};

export default ExamSection;
