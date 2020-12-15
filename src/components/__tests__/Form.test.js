import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers = {interviewers} />)

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    // console.log(getByTestId("student-name-input"));
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} onSave={onSave} />)

    fireEvent.click(getByText(/save/i))

    /* 1. validation is shown */
    expect(getByText(/Please input your name or choose a interviewer/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfuly save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { queryByText, getByText, getByPlaceholderText } = render(
    <Form 
      interviewers={interviewers} 
      onSave={onSave} 
      interviewerId={1}
      />)

    fireEvent.click(getByText(/save/i))

    /* 3. validation is not shown */
    expect(queryByText(/Please input your name or choose a interviewer/i)).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();

    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/Please input your name or choose a interviewer/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        interviewerId={1}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

