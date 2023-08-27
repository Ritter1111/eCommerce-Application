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
              action: "setFirstName",
              firstName: firstName,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
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
              action: "setLastName",
              lastName: lastName,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
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
              action: "setDateOfBirth",
              dateOfBirth: dateOfBirth,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New date of birth set successfully`);
    } else {
      console.error(`Failed to set new date of birth`);
    }
  } catch (error) {
    console.error(`Error setting new date of birth:`, error);
  }
}