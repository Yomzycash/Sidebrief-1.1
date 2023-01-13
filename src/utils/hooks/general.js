let errorRef = useRef(true);

useEffect(() => {
  refetch();
  if (isError && errorRef.current === true) {
    handleError(error);
    errorRef.current = false;
  }
}, []);
