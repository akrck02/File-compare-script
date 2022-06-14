mkdir logs 2>/dev/null 

echo "Comparing files"
npm run start > ./logs/FileCompare.log 2>&1
echo "Comparation finished, check the log file for more information"




