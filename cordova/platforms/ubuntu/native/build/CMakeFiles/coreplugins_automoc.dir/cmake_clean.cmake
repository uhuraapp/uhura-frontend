FILE(REMOVE_RECURSE
  "cordova-ubuntu_automoc.cpp"
  "cordovaubuntuplugin_automoc.cpp"
  "coreplugins_automoc.cpp"
  "CMakeFiles/coreplugins_automoc"
)

# Per-language clean rules from dependency scanning.
FOREACH(lang)
  INCLUDE(CMakeFiles/coreplugins_automoc.dir/cmake_clean_${lang}.cmake OPTIONAL)
ENDFOREACH(lang)
