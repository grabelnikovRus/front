BIN=./bin/dotenv-linter

if [ ! -f "$BIN" ]; then
    echo "Installing dotenv-linter"
    curl -sSfL https://git.io/JLbXn | sh -s
fi

$BIN -s UnorderedKey
$BIN compare .env.local .env.example
$BIN compare .env.production .env.development
