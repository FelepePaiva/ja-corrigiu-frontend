// src/components/CreateExamForm.jsx

import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import RadioOption from "./RadioButton";

const alternativas = ["A", "B", "C", "D", "E"];

const CreateExamForm = ({
  form,
  onChange,
  onSubmit,
  classes,
  message,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Atualiza o state quando questions_count mudar
  useEffect(() => {
    const qnt = parseInt(form.questions_count);
    if (qnt > 0) {
      const nova = Array(qnt).fill("");
      setSelectedAnswers(nova);
    }
  }, [form.questions_count]);

  // Atualiza a resposta da questão no índice correto
  const handleRadioSelect = (index, value) => {
    const atualizadas = [...selectedAnswers];
    atualizadas[index] = value;
    setSelectedAnswers(atualizadas);
  };

  // Atualiza o answer_key com base no state
  useEffect(() => {
    onChange({
      target: { name: "answer_key", value: selectedAnswers.join(",") },
    });
  }, [selectedAnswers]);

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 640 }}>
      <Input
        type="text"
        name="title"
        placeholder="Título da Prova"
        value={form.title}
        onChange={onChange}
        required
      />

      <Select
        name="classId"
        value={form.classId}
        onChange={onChange}
        required
      >
        <option value="">Selecione a turma</option>
        {Array.isArray(classes) &&
          classes.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.code}
            </option>
          ))}
      </Select>

      <Input
        type="number"
        name="questions_count"
        min={1}
        placeholder="Quantidade de Questões"
        value={form.questions_count}
        onChange={onChange}
        required
      />

      <Input
        type="number"
        name="bimester"
        min={1}
        max={4}
        placeholder="Bimestre"
        value={form.bimester}
        onChange={onChange}
        required
      />

      {/* Gabarito via radio */}
      {form.questions_count > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Gabarito</h3>
          {Array.from({ length: parseInt(form.questions_count) }, (_, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ marginRight: 16 }}>Questão {i + 1}:</label>
              {alternativas.map((alt) => (
                <label key={alt} style={{ marginRight: 12 }}>
                  <RadioOption
                    type="radio"
                    name={`question_${i}`}
                    value={alt}
                    checked={selectedAnswers[i] === alt}
                    onChange={() => handleRadioSelect(i, alt)}
                  />{" "}
                  {alt}
                </label>
              ))}
            </div>
          ))}
        </div>
      )}

      <Button type="submit">Cadastrar Prova</Button>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.startsWith("Erro") ? "#cb2222" : "#27ae60",
            marginTop: 12,
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default CreateExamForm;
