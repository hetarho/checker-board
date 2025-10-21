import { describe, expect, it } from "vitest";
import { cn } from "../cn";

describe("cn 유틸 함수", () => {
  it("단일 클래스 문자열을 반환해야 함", () => {
    const result = cn("text-red-500");
    expect(result).toBe("text-red-500");
  });

  it("여러 클래스 문자열을 병합해야 함", () => {
    const result = cn("text-red-500", "bg-blue-500", "p-4");
    expect(result).toBe("text-red-500 bg-blue-500 p-4");
  });

  it("조건부 클래스를 올바르게 처리해야 함", () => {
    const result = cn({
      "text-red-500": true,
      "bg-blue-500": false,
      "p-4": true,
    });
    expect(result).toBe("text-red-500 p-4");
  });

  it("배열 형태의 클래스를 병합해야 함", () => {
    const result = cn(["text-red-500", "bg-blue-500"], "p-4");
    expect(result).toBe("text-red-500 bg-blue-500 p-4");
  });

  it("falsy 값들을 필터링해야 함", () => {
    const result = cn("text-red-500", null, undefined, false, "", "p-4");
    expect(result).toBe("text-red-500 p-4");
  });

  it("중복된 클래스를 제거해야 함", () => {
    const result = cn("p-4", "p-4", "text-red-500");
    expect(result).toBe("p-4 text-red-500");
  });

  it("Tailwind 클래스 충돌 시 마지막 클래스가 적용되어야 함", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("동일한 속성의 Tailwind 클래스 충돌을 올바르게 처리해야 함", () => {
    const result = cn("p-4", "p-8");
    expect(result).toBe("p-8");
  });

  it("다양한 Tailwind 유틸리티 클래스 충돌을 처리해야 함", () => {
    const result = cn("mt-2", "mt-4", "mb-2");
    expect(result).toBe("mt-4 mb-2");
  });

  it("복잡한 조건부 및 배열 조합을 처리해야 함", () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn(
      "base-class",
      {
        "active-class": isActive,
        "disabled-class": isDisabled,
      },
      ["array-class-1", "array-class-2"],
      isActive && "conditional-class"
    );

    expect(result).toBe(
      "base-class active-class array-class-1 array-class-2 conditional-class"
    );
  });

  it("반응형 Tailwind 클래스를 올바르게 병합해야 함", () => {
    const result = cn("text-sm", "md:text-base", "lg:text-lg");
    expect(result).toBe("text-sm md:text-base lg:text-lg");
  });

  it("같은 반응형 브레이크포인트의 충돌하는 클래스는 마지막 것만 적용되어야 함", () => {
    const result = cn("md:text-sm", "md:text-lg");
    expect(result).toBe("md:text-lg");
  });

  it("호버 및 기타 pseudo 클래스를 올바르게 처리해야 함", () => {
    const result = cn(
      "text-gray-900",
      "hover:text-blue-500",
      "focus:text-red-500"
    );
    expect(result).toBe("text-gray-900 hover:text-blue-500 focus:text-red-500");
  });

  it("다크모드 클래스를 올바르게 처리해야 함", () => {
    const result = cn("bg-white", "dark:bg-gray-900");
    expect(result).toBe("bg-white dark:bg-gray-900");
  });

  it("빈 입력에 대해 빈 문자열을 반환해야 함", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("실제 사용 예시: 버튼 컴포넌트 스타일", () => {
    const variant = "primary" as "primary" | "secondary";
    const size = "md" as "sm" | "md" | "lg";
    const disabled = false;

    const result = cn(
      "rounded-lg font-semibold transition-colors",
      {
        "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
        "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
      },
      {
        "px-3 py-1.5 text-sm": size === "sm",
        "px-4 py-2 text-base": size === "md",
        "px-6 py-3 text-lg": size === "lg",
      },
      {
        "opacity-50 cursor-not-allowed": disabled,
      }
    );

    expect(result).toContain("rounded-lg");
    expect(result).toContain("font-semibold");
    expect(result).toContain("transition-colors");
    expect(result).toContain("bg-blue-500");
    expect(result).toContain("text-white");
    expect(result).toContain("hover:bg-blue-600");
    expect(result).toContain("px-4");
    expect(result).toContain("py-2");
    expect(result).toContain("text-base");
    expect(result).not.toContain("opacity-50");
    expect(result).not.toContain("cursor-not-allowed");
  });

  it("실제 사용 예시: 카드 컴포넌트 동적 스타일", () => {
    const isHovered = true;
    const isSelected = false;

    const result = cn(
      "p-6 rounded-xl border transition-all",
      "border-gray-200 bg-white",
      {
        "shadow-lg scale-105": isHovered,
        "border-blue-500 bg-blue-50": isSelected,
      }
    );

    expect(result).toContain("p-6");
    expect(result).toContain("rounded-xl");
    expect(result).toContain("shadow-lg");
    expect(result).toContain("scale-105");
    expect(result).not.toContain("border-blue-500");
    expect(result).not.toContain("bg-blue-50");
  });
});
