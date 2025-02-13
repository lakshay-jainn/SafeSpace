export const handleApiError = (error: any) => {
    if (error.response) {
      return error.response.data
    } else {
      return error
    }
  };