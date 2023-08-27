import { errorNotify } from '../../utils/ErrorPupUp';
import { successNotify } from '../../utils/SuccessPopUp';

export async function setNewFirstName(version: string, firstName: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          version: version,
          actions: [
            {
              action: 'setFirstName',
              firstName: firstName,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      successNotify(`Your name has been successfully changed to ${firstName}`);
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New name set successfully`);
    } else {
      console.error(`Failed to set new name`);
    }
  } catch (error) {
    console.error(`Error setting new name:`, error);
  }
}

export async function setNewLastName(version: string, lastName: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          version: version,
          actions: [
            {
              action: 'setLastName',
              lastName: lastName,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      successNotify(`Your last name has been successfully changed to ${lastName}`);
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New last name set successfully`);
    } else {
      console.error(`Failed to set new last name`);
    }
  } catch (error) {
    console.error(`Error setting new last name:`, error);
  }
}

export async function setNewDateOfBirth(version: string, dateOfBirth: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          version: version,
          actions: [
            {
              action: 'setDateOfBirth',
              dateOfBirth: dateOfBirth,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      successNotify(`Your date of birth has been successfully changed to ${dateOfBirth}`);
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New date of birth set successfully`);
    } else {
      console.error(`Failed to set new date of birth`);
    }
  } catch (error) {
    console.error(`Error setting new date of birth:`, error);
  }
}

export async function setNewEmail(version: string, email: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          version: version,
          actions: [
            {
              action: 'changeEmail',
              email: email,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      successNotify(`Your email has been successfully changed to ${email}`);
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New email set successfully`);
    } else {
      console.error(`Failed to set new email`);
    }
  } catch (error) {
    console.error(`Error setting new email:`, error);
  }
}

export async function resetPassword(version: string, newPassword: string, currentPassword: string){
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          version: version,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      successNotify(`Your passwor has been successfully changed`);
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New password set successfully`);
    } else {
      if (data.statusCode === 400) {
        errorNotify(`Wrong current password`);
      }
      console.error(`Failed to set new password`);
    }
  } catch (error) {
    console.error(`Error setting new password:`, error);
  }
}