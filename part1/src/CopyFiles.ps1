Param(
    [Parameter(Mandatory, Position=0)]
    [string]
    $source,
    [Parameter(Mandatory,Position=1)]
    [string]
    $dest,   
    [string] $filter
    )
    
$Source = $source
$Dest = $dest

#-Filter "*.pdf"
Get-ChildItem $Source -Recurse -Filter $filter | Copy-Item -Destination $Dest -Verbose 

#copy folder
#powershell.exe -file .\CopyFiles.ps1 -source 'C:\Users\sys\test' -dest 'C:\Users\sys\Videos' -filter '*.pdf'

#copy file 
# powershell.exe -file .\CopyFiles.ps1 -source 'C:\Users\sys\test\rssh.xml' -dest 'C:\Users\sys\Videos\rsss-new.xml' 