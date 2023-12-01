def isValid(s: str) -> bool:
        keys = {
            ")":"(",
            "}":"{",
            "]":"["
        }

        x = []

        for i in s:
            x.append(i)

        for _ in range(len(x)//2):
            if keys[x.pop()] == x.pop():
                continue
            else:
                return False
        return True

print(isValid(s="()")) # True