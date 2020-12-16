import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getByTestId, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios"

afterEach(cleanup);

describe("Application", () => {
  it("dafaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText, container } = render(<Application />);

    // return waitForElement(() => getByText("Monday")).then(() => {
    //   fireEvent.click(getByText("Tuesday"));

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"))

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />)
    
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { 
      target: { value: "Lydia Miller-Jones"}
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Lydia Miller-Jones")
    )

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  })

  it("loads data, cancels the action of deleting an interview", async () => {

    //1. Render the Application
    const { container } = render(<Application />)

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //3. Click the "Delete" button on the exisiting appointment
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))

    fireEvent.click(getByAltText(appointment, "Delete"));

    //4. Check that the "Confirm" message is displayed
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    //5. Click on the "Cancel" button on the confirmation
    fireEvent.click(getByText(appointment, "Cancel"));

    //6. Wait until the element with the text "John Smith" is displayed
    await waitForElement(() => getByText(appointment, "Archie Cohen"));

    //7. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    //1. Render the Application
    const { container } = render(<Application />)

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //3. Click the "Delete" button on the exisiting appointment
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))

    fireEvent.click(getByAltText(appointment, "Delete"));

    //4. Check that the "Confirm" message is displayed
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    //5. Click on the "Confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    //6. Check that the element with the text "Deleting" is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //7. Wait until the element with the "Add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    //8. Check that the DayListItem with the text "Monday" also has the text "2 spot remaining"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //1. Render the Application
    const { container } = render(<Application />)

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //3. Click on the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))
  
    fireEvent.click(getByAltText(appointment, "Edit"));

    //4. Check that the Form is rendered with student name "Archie Cohen" & interviewer "Tori Malcolm" is pre-selected
    expect(getByTestId(appointment, "student-name-input")).toHaveValue("Archie Cohen")

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    //5. Enter the name "John Smith" into the input with the placeholder "Enter Student Name" and "Sylvia Palmer" selected as the interviewer
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "John Smith"}})

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6. Click the "Save" button on the Form
    fireEvent.click(getByText(appointment, "Save"));
  
    //7. Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    //8. Wait until the element with the text "John Smith" is displayed
    await waitForElement(() => getByText(appointment, "John Smith"));

    //9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("show the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    //1. Render the Application
    const { container } = render(<Application />)

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //3. Click on the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))

    fireEvent.click(getByAltText(appointment, "Edit"));

    //4. Check that the Form is rendered with student name "Archie Cohen" & interviewer "Tori Malcolm" is pre-selected
    expect(getByTestId(appointment, "student-name-input")).toHaveValue("Archie Cohen")

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    //5. Enter the name "John Smith" into the input with the placeholder "Enter Student Name" and "Sylvia Palmer" selected as the interviewer
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "John Smith" } })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6. Click the "Save" button on the Form
    fireEvent.click(getByText(appointment, "Save"));
    
    //7. Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //8. Wait until the element with the text "Unable to save appointment" is displayed
    await waitForElement(() => getByText(appointment, "Unable to save appointment"));

    //9. Click the "Close" button on the error display
    fireEvent.click(getByAltText(appointment, "Close"));

    //10. Check that the Form page is displayed with the original info.
    expect(getByTestId(appointment, "student-name-input")).toHaveValue("Archie Cohen")

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    //11. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("show the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    //1. Render the Application
    const { getByText, getByAltText, getAllByTestId } = render(<Application />)

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText("Archie Cohen"))

    //3. Click on the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText("Delete"));

    //4. Check that the confirm message with the text "Are you sure you want to delete?" is displayed
    expect(getByText("Are you sure you want to delete?")).toBeInTheDocument();

    //5. Click on the "Confirm" button on the Confirm message panel.
    fireEvent.click(getByText("Confirm"))
    
    //6. Check that the element with the text "Deleting" is displayed
    expect(getByText("Deleting")).toBeInTheDocument();

    //7. Wait until the element with the text "Unable to delete appointment" is displayed
    await waitForElement(() => getByText("Unable to delete appointment"));

    //8. Click the "Close" button on the error display
    fireEvent.click(getByAltText("Close"));

    //9. Check that the Form page is displayed with the original info.
    expect(getByText("Archie Cohen"))
    expect(getByText("Tori Malcolm")).toBeInTheDocument();

    //10. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId("day").find(day => queryByText(day, "Monday"))

    expect(day).toHaveTextContent("1 spot remaining");
  })
})

