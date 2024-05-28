function GetAllCpuInfo()
    local cpus = c.me_controller.getCpus()
    for _,v in pairs(cpus)do
        v["CraftingItem"] = v.cpu.finalOutput()
        v["cpu"] = nil
    end
    return cpus
end

function Craft(name, damage, amount)
    return c.me_controller.getCraftables({name=name, damage=damage})[1].request(amount, true)
end

function CancelCrafting(cpuid)
    local cpu = c.me_controller.getCpus()[cpuid + 1]['cpu']
    cpu.cancel()
    return nil
end

function GetCpuInfo(cpuid)
    local cpu = c.me_controller.getCpus()[cpuid + 1]['cpu']
    local json = require('json')
    local result = {}
    result["id"] = cpuid
    result["craftings"] = cpu.activeItems()
    result["storeds"] = cpu.storedItems()
    result["pendings"] = cpu.pendingItems()
    result["finalOutput"] = cpu.finalOutput()
    result["busy"] = cpu.isBusy()
    return result
    -- return json.encode(cpu.activeItems()) .. "^#^#"
    --     .. json.encode(cpu.storedItems()) .. "^#^#"
    --     .. json.encode(cpu.pendingItems()) .. "^#^#"
    --     .. json.encode(cpu.finalOutput()).. "^#^#"
    --     .. json.encode(cpu.isBusy())
end

function getAllItems()
    return c.me_controller.getItemsInNetwork();
end

function GetAllCpuFinalOutput()
    local cpus = c.me_controller.getCpus()
    local result = ""
    local n = 0
    for _, v in pairs(cpus) do
        result = result .. require("json").encode(v["cpu"].finalOutput()) .. "\n"
    end
    return result;
end
