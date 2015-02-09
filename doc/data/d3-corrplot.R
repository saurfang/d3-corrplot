library(jsonlite)
library(dplyr)
library(ggplot2)

makeJSON <- function(data, name) {
  if(missing(name)) {
    name <- substitute(data)
  }
  list(
    nodes = lapply(names(data), . %>% { list(name = unbox(.)) }),
    matrix = cor(data, use = "pairwise")
  ) %>%
    toJSON(pretty = TRUE) %>%
    writeLines(paste0(as.character(name), ".json"))
}

makeJSON(mtcars)
makeJSON(select(movies, -title, -mpaa), "movies")