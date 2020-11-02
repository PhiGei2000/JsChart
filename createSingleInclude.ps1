[string] $ouputFile = "charts.js"


[string[]]$files = [System.IO.Directory]::GetFiles("./scripts", "*.js", [System.IO.SearchOption]::AllDirectories)

[string]$script = "";
foreach ($file in $files) {
    $script += [System.IO.File]::ReadAllText($file) + "`r`n`r`n";
}
[System.IO.File]::WriteAllText($ouputFile, $script);