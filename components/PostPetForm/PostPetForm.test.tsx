import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostPetForm from './PostPetForm';

describe('Post pet form tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display the basic field on render', () => {
    render(<PostPetForm />);

    expect(screen.getByText('Name of the pet')).toBeInTheDocument();
    expect(screen.getByText('Age of the pet')).toBeInTheDocument();
    expect(screen.getByText('Age type')).toBeInTheDocument();
    expect(screen.getByText('Pet type')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('Should parse age input correctly with parseInt', () => {
    render(<PostPetForm />);

    const ageInput = screen.getByPlaceholderText('Age');

    fireEvent.change(ageInput, { target: { value: '5' } });
    expect(ageInput).toHaveValue(5);

    fireEvent.change(ageInput, { target: { value: 'abc' } });
    expect(ageInput).toHaveValue(0);
  });

  it('Should show illness description field when hasIllness is checked', async () => {
    render(<PostPetForm />);

    const illnessSwitch = screen.getByRole('switch', {
      name: /pet has illness/i,
    });

    expect(screen.queryByText('Illness Description')).not.toBeInTheDocument();

    fireEvent.click(illnessSwitch);

    await waitFor(() => {
      expect(screen.getByText('Illness Description')).toBeInTheDocument();
    });
  });

  it('Should show medication description field when needMedications is checked', async () => {
    render(<PostPetForm />);

    const medicationSwitch = screen.getByRole('switch', {
      name: /needs medications/i,
    });

    expect(
      screen.queryByText('Medication Description'),
    ).not.toBeInTheDocument();

    fireEvent.click(medicationSwitch);

    await waitFor(() => {
      expect(screen.getByText('Medication Description')).toBeInTheDocument();
    });
  });

  it('Should validate illness description is required when hasIllness is true', async () => {
    render(<PostPetForm />);

    fireEvent.change(screen.getByPlaceholderText('Name of the pet'), {
      target: { value: 'Test Pet' },
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('A description of the pet'), {
      target: { value: 'This is a test description for the pet' },
    });

    const illnessSwitch = screen.getByRole('switch', {
      name: /pet has illness/i,
    });
    fireEvent.click(illnessSwitch);

    await waitFor(() => {
      expect(screen.getByText('Illness Description')).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Illness description is required'),
      ).toBeInTheDocument();
    });
  });

  it('Should validate medication description is required when needMedications is true', async () => {
    render(<PostPetForm />);

    fireEvent.change(screen.getByPlaceholderText('Name of the pet'), {
      target: { value: 'Test Pet' },
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('A description of the pet'), {
      target: { value: 'This is a test description for the pet' },
    });

    const medicationSwitch = screen.getByRole('switch', {
      name: /needs medications/i,
    });
    fireEvent.click(medicationSwitch);

    await waitFor(() => {
      expect(screen.getByText('Medication Description')).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Medication description is required'),
      ).toBeInTheDocument();
    });
  });

  it('Should call onSubmit with form values when form is valid', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<PostPetForm />);

    fireEvent.change(screen.getByPlaceholderText('Name of the pet'), {
      target: { value: 'Test Pet' },
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('A description of the pet'), {
      target: { value: 'This is a test description for the pet' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        petname: 'Test Pet',
        age: 2,
        ageType: 'years',
        petType: 'Dog',
        description: 'This is a test description for the pet',
        hasIllnes: false,
        illnesDescription: '',
        needMedications: false,
        medicationDescription: '',
      });
    });
  });

  it('Should pass validation when illness description is provided', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<PostPetForm />);

    fireEvent.change(screen.getByPlaceholderText('Name of the pet'), {
      target: { value: 'Test Pet' },
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('A description of the pet'), {
      target: { value: 'This is a test description for the pet' },
    });

    const illnessSwitch = screen.getByRole('switch', {
      name: /pet has illness/i,
    });
    fireEvent.click(illnessSwitch);

    await waitFor(() => {
      expect(screen.getByText('Illness Description')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Describe the illness...'), {
      target: { value: 'Has allergies' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          hasIllnes: true,
          illnesDescription: 'Has allergies',
        }),
      );
    });
  });

  it('Should pass validation when medication description is provided', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<PostPetForm />);

    fireEvent.change(screen.getByPlaceholderText('Name of the pet'), {
      target: { value: 'Test Pet' },
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('A description of the pet'), {
      target: { value: 'This is a test description for the pet' },
    });

    const medicationSwitch = screen.getByRole('switch', {
      name: /needs medications/i,
    });
    fireEvent.click(medicationSwitch);

    await waitFor(() => {
      expect(screen.getByText('Medication Description')).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText('Describe the medications needed...'),
      { target: { value: 'Daily vitamins' } },
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          needMedications: true,
          medicationDescription: 'Daily vitamins',
        }),
      );
    });
  });
});
