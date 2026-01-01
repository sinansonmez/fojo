BIN_DIR=../dist/bin
WASM_DIR=../dist/wasm

CLI_PKG=./cmd/cli
WASM_PKG=./cmd/wasm

.PHONY: all clean cli wasm

all: cli wasm

clean:
	rm -rf $(BIN_DIR) $(WASM_DIR)

cli:
	GOOS=linux GOARCH=amd64 \
		go build -o $(BIN_DIR)/linux-x64/fojo $(CLI_PKG)

	GOOS=darwin GOARCH=amd64 \
		go build -o $(BIN_DIR)/darwin-x64/fojo $(CLI_PKG)

	GOOS=darwin GOARCH=arm64 \
		go build -o $(BIN_DIR)/darwin-arm64/fojo $(CLI_PKG)

	GOOS=windows GOARCH=amd64 \
		go build -o $(BIN_DIR)/win32-x64/fojo.exe $(CLI_PKG)

wasm:
	GOOS=js GOARCH=wasm \
		go build -o $(WASM_DIR)/fojo.wasm $(WASM_PKG)