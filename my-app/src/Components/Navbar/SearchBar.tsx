import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Category } from "../../Utils/utils";
import { handleInputChange } from "../../HelperFunctions/SearchSuggestions";

const SearchBar = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState< { id: number; category: Category; title: string; thumbnail: string; description: string }[] >([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home/movie/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSuggestions([]);
    }
  };

  return (
    <Box
      ref={searchRef}
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{ display: "flex", alignItems: "center", position: "relative" }}
    >
      {searchOpen && (
        <InputBase
          placeholder="Search movies or TV..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value, setSearchQuery, setSuggestions)
          }
          sx={{
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.1)",
            px: 1,
            borderRadius: 1,
            width: { xs: 160, sm: 220 },
          }}
        />
      )}
      <IconButton onClick={() => setSearchOpen((prev) => !prev)} sx={{ color: "#fff" }}>
        <SearchIcon />
      </IconButton>

      {suggestions.length > 0 && searchOpen && (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          backgroundColor: "#222",
          color: "#fff",
          width: { xs: 160, sm: 300 },
          borderRadius: 1,
          mt: 1,
          zIndex: 10,
          maxHeight: 300,
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {suggestions.map((s, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1,
              py: 0.5,
              cursor: "pointer",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={() => {
              navigate(`/home/${s.category}/${s.id}`); 
              setSearchOpen(false);
              setSuggestions([]);
            }}
          >
            <Box
              component="img"
              src={s.thumbnail}
              alt={s.title}
              sx={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: "50%", 
                mr: 1.5,
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", flex: 1 }}>
              <Box
                sx={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis", 
                  maxWidth: "100%",
                }}
                title={s.title}
              >
                {s.title}
              </Box>
              <Box
                sx={{
                  fontSize: "0.8rem",
                  color: "#aaa",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis", 
                  maxWidth: "100%",
                }}
                title={s.title}
              >
                {s.description}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    )}
    </Box>
  );
};

export default SearchBar;
